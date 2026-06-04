import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  MessageCircle,
  Heart,
  Search,
  Plus
} from 'lucide-react';
import { Card, LanguageBadge } from '../components/common';
import { useCommunityStore } from '../stores';
import type { Language } from '../types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function CommunityPage() {
  const { posts, groups, likePost } = useCommunityStore();
  const [activeTab, setActiveTab] = useState<'posts' | 'groups'>('posts');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | 'all'>('all');

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = selectedLanguage === 'all' || post.language === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = selectedLanguage === 'all' || group.language === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto space-y-8"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-text-primary mb-2">社区中心</h1>
          <p className="text-text-secondary">与全球学习者一起交流进步</p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[280px] relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input
              type="text"
              placeholder="搜索话题或小组..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-surface rounded-xl border border-surface-light text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value as Language | 'all')}
            className="px-4 py-3 bg-surface rounded-xl border border-surface-light text-text-primary focus:outline-none focus:border-primary"
          >
            <option value="all">全部语言</option>
            <option value="en">英语</option>
            <option value="ja">日语</option>
            <option value="ko">韩语</option>
          </select>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="flex gap-4 border-b border-surface-light">
            <button
              onClick={() => setActiveTab('posts')}
              className={`px-4 py-3 font-medium transition-colors relative ${
                activeTab === 'posts'
                  ? 'text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                话题
              </div>
              {activeTab === 'posts' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('groups')}
              className={`px-4 py-3 font-medium transition-colors relative ${
                activeTab === 'groups'
                  ? 'text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                学习小组
              </div>
              {activeTab === 'groups' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
          </div>
        </motion.div>

        {activeTab === 'posts' && (
          <motion.div
            variants={containerVariants}
            className="space-y-4"
          >
            {filteredPosts.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <Card className="p-5">
                  <div className="flex items-start gap-4">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="w-12 h-12 rounded-full bg-surface-light"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-text-primary">{post.authorName}</span>
                        <LanguageBadge language={post.language} size="sm" />
                        <span className="text-xs text-text-secondary">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-text-primary mb-4">{post.content}</p>
                      <div className="flex items-center gap-6">
                        <button
                          onClick={() => likePost(post.id)}
                          className="flex items-center gap-2 text-text-secondary hover:text-red-400 transition-colors"
                        >
                          <Heart className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <MessageCircle className="w-12 h-12 text-text-secondary mx-auto mb-4" />
                <p className="text-text-secondary">暂无话题</p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'groups' && (
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 gap-4"
          >
            {filteredGroups.map((group) => (
              <motion.div key={group.id} variants={itemVariants}>
                <Card hover className="p-4 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <img
                      src={group.coverImage}
                      alt={group.name}
                      className="w-16 h-16 rounded-xl object-cover bg-surface-light"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-text-primary">{group.name}</h3>
                        <LanguageBadge language={group.language} size="sm" />
                      </div>
                      <p className="text-sm text-text-secondary mb-2 line-clamp-2">
                        {group.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-text-secondary">
                        <Users className="w-3 h-3" />
                        <span>{group.memberCount} 成员</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div variants={itemVariants}>
          <button className="w-full py-4 rounded-xl border-2 border-dashed border-surface-light text-text-secondary hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            创建新话题
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
