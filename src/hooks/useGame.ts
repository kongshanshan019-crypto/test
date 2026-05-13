import { useState, useCallback, useEffect, useRef } from 'react';
import {
  Tetromino,
  createEmptyBoard,
  getRandomTetromino,
  rotateTetromino,
  checkCollision,
  mergePieceToBoard,
  clearLines,
  getScoreForLines,
  BOARD_WIDTH,
} from '../utils/tetrominos';

export type GameStatus = 'idle' | 'playing' | 'paused' | 'gameover';

interface GameState {
  board: number[][];
  currentPiece: Tetromino | null;
  nextPiece: Tetromino | null;
  position: { x: number; y: number };
  score: number;
  lines: number;
  level: number;
  gameStatus: GameStatus;
}

const INITIAL_STATE: GameState = {
  board: createEmptyBoard(),
  currentPiece: null,
  nextPiece: null,
  position: { x: 0, y: 0 },
  score: 0,
  lines: 0,
  level: 1,
  gameStatus: 'idle',
};

const COLOR_MAP: Record<number, string> = {
  1: '#00f5ff',
  2: '#ffff00',
  3: '#a855f7',
  4: '#22c55e',
  5: '#ef4444',
  6: '#3b82f6',
  7: '#f97316',
};

const TYPE_TO_COLOR_INDEX: Record<string, number> = {
  I: 1,
  O: 2,
  T: 3,
  S: 4,
  Z: 5,
  J: 6,
  L: 7,
};

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const gameLoopRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const getDropInterval = useCallback((level: number): number => {
    return Math.max(100, 1000 - (level - 1) * 100);
  }, []);

  const spawnPiece = useCallback((): { piece: Tetromino; position: { x: number; y: number } } => {
    const piece = getRandomTetromino();
    const position = {
      x: Math.floor((BOARD_WIDTH - piece.shape[0].length) / 2),
      y: 0,
    };
    return { piece, position };
  }, []);

  const startGame = useCallback(() => {
    const { piece: currentPiece, position } = spawnPiece();
    const nextPiece = getRandomTetromino();
    
    setGameState({
      ...INITIAL_STATE,
      board: createEmptyBoard(),
      currentPiece,
      nextPiece,
      position,
      gameStatus: 'playing',
    });
  }, [spawnPiece]);

  const pauseGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gameStatus: prev.gameStatus === 'playing' ? 'paused' : 'playing',
    }));
  }, []);

  const resetGame = useCallback(() => {
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
    setGameState(INITIAL_STATE);
  }, []);

  const movePiece = useCallback((dx: number, dy: number) => {
    setGameState(prev => {
      if (prev.gameStatus !== 'playing' || !prev.currentPiece) return prev;

      const newPosition = {
        x: prev.position.x + dx,
        y: prev.position.y + dy,
      };

      if (!checkCollision(prev.board, prev.currentPiece, newPosition)) {
        return { ...prev, position: newPosition };
      }

      if (dy > 0) {
        const colorIndex = TYPE_TO_COLOR_INDEX[prev.currentPiece.type];
        const newBoard = mergePieceToBoard(prev.board, prev.currentPiece, prev.position, colorIndex);
        const { newBoard: clearedBoard, clearedLines } = clearLines(newBoard);
        
        const newLines = prev.lines + clearedLines;
        const newLevel = Math.floor(newLines / 10) + 1;
        const scoreGain = getScoreForLines(clearedLines, prev.level);
        const newScore = prev.score + scoreGain;

        const { piece: newPiece, position: newPiecePosition } = spawnPiece();
        
        if (checkCollision(clearedBoard, newPiece, newPiecePosition)) {
          return {
            ...prev,
            board: clearedBoard,
            currentPiece: null,
            gameStatus: 'gameover',
            lines: newLines,
            level: newLevel,
            score: newScore,
          };
        }

        return {
          ...prev,
          board: clearedBoard,
          currentPiece: newPiece,
          nextPiece: getRandomTetromino(),
          position: newPiecePosition,
          lines: newLines,
          level: newLevel,
          score: newScore,
        };
      }

      return prev;
    });
  }, []);

  const rotate = useCallback(() => {
    setGameState(prev => {
      if (prev.gameStatus !== 'playing' || !prev.currentPiece) return prev;

      const rotatedShape = rotateTetromino(prev.currentPiece.shape);
      const rotatedPiece: Tetromino = {
        ...prev.currentPiece,
        shape: rotatedShape,
      };

      if (!checkCollision(prev.board, rotatedPiece, prev.position)) {
        return { ...prev, currentPiece: rotatedPiece };
      }

      const kicks = [-1, 1, -2, 2];
      for (const kick of kicks) {
        const kickedPosition = { ...prev.position, x: prev.position.x + kick };
        if (!checkCollision(prev.board, rotatedPiece, kickedPosition)) {
          return { ...prev, currentPiece: rotatedPiece, position: kickedPosition };
        }
      }

      return prev;
    });
  }, []);

  const hardDrop = useCallback(() => {
    setGameState(prev => {
      if (prev.gameStatus !== 'playing' || !prev.currentPiece) return prev;

      let newY = prev.position.y;
      while (!checkCollision(prev.board, prev.currentPiece, { x: prev.position.x, y: newY + 1 })) {
        newY++;
      }

      const colorIndex = TYPE_TO_COLOR_INDEX[prev.currentPiece.type];
      const newBoard = mergePieceToBoard(prev.board, prev.currentPiece, { x: prev.position.x, y: newY }, colorIndex);
      const { newBoard: clearedBoard, clearedLines } = clearLines(newBoard);
      
      const newLines = prev.lines + clearedLines;
      const newLevel = Math.floor(newLines / 10) + 1;
      const scoreGain = getScoreForLines(clearedLines, prev.level) + newY * 2;
      const newScore = prev.score + scoreGain;

      const { piece: newPiece, position: newPiecePosition } = spawnPiece();
      
      if (checkCollision(clearedBoard, newPiece, newPiecePosition)) {
        return {
          ...prev,
          board: clearedBoard,
          currentPiece: null,
          gameStatus: 'gameover',
          lines: newLines,
          level: newLevel,
          score: newScore,
        };
      }

      return {
        ...prev,
        board: clearedBoard,
        currentPiece: newPiece,
        nextPiece: getRandomTetromino(),
        position: newPiecePosition,
        lines: newLines,
        level: newLevel,
        score: newScore,
      };
    });
  }, []);

  const getDisplayBoard = useCallback(() => {
    const { board, currentPiece, position } = gameState;
    if (!currentPiece) return board;

    const displayBoard = board.map(row => [...row]);
    const colorIndex = TYPE_TO_COLOR_INDEX[currentPiece.type];

    for (let row = 0; row < currentPiece.shape.length; row++) {
      for (let col = 0; col < currentPiece.shape[row].length; col++) {
        if (currentPiece.shape[row][col]) {
          const y = position.y + row;
          const x = position.x + col;
          if (y >= 0 && y < displayBoard.length && x >= 0 && x < displayBoard[0].length) {
            displayBoard[y][x] = colorIndex;
          }
        }
      }
    }

    return displayBoard;
  }, [gameState]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.gameStatus !== 'playing') {
        if (e.key === 'Enter') {
          startGame();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          movePiece(-1, 0);
          break;
        case 'ArrowRight':
          e.preventDefault();
          movePiece(1, 0);
          break;
        case 'ArrowDown':
          e.preventDefault();
          movePiece(0, 1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          rotate();
          break;
        case ' ':
          e.preventDefault();
          hardDrop();
          break;
        case 'p':
        case 'P':
          pauseGame();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.gameStatus, movePiece, rotate, hardDrop, pauseGame, startGame]);

  useEffect(() => {
    if (gameState.gameStatus !== 'playing') {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
        gameLoopRef.current = null;
      }
      return;
    }

    const gameLoop = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      const deltaTime = timestamp - lastTimeRef.current;
      const dropInterval = getDropInterval(gameState.level);

      if (deltaTime >= dropInterval) {
        movePiece(0, 1);
        lastTimeRef.current = timestamp;
      }

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState.gameStatus, gameState.level, movePiece, getDropInterval]);

  return {
    ...gameState,
    displayBoard: getDisplayBoard(),
    colorMap: COLOR_MAP,
    startGame,
    pauseGame,
    resetGame,
    movePiece,
    rotate,
    hardDrop,
  };
};