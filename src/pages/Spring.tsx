import { Link } from 'react-router-dom';

export default function Spring() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-green-100 to-green-200 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <Link 
            to="/" 
            className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg transition-colors inline-block"
          >
            ← 返回俄罗斯方块游戏
          </Link>
        </div>
        <h1 className="text-5xl font-bold text-green-800 text-center mb-8">
          🌸 春天来了 🌸
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <img 
              src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20spring%20landscape%20with%20cherry%20blossoms%20pink%20flowers%20blooming%20sunny%20day%20blue%20sky&image_size=landscape_16_9" 
              alt="春天樱花盛开"
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-green-700 mb-2">樱花盛开</h3>
            <p className="text-gray-600">粉色的樱花在春风中轻轻摇曳，带来浪漫的气息。</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <img 
              src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=colorful%20tulip%20field%20spring%20flowers%20red%20yellow%20purple%20tulips%20beautiful%20garden&image_size=landscape_16_9" 
              alt="郁金香花园"
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-green-700 mb-2">郁金香花园</h3>
            <p className="text-gray-600">五彩斑斓的郁金香竞相绽放，如同一幅绚丽的画卷。</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <img 
              src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=spring%20forest%20with%20fresh%20green%20leaves%20sunlight%20through%20trees%20nature%20peaceful&image_size=landscape_16_9" 
              alt="春日森林"
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-green-700 mb-2">春日森林</h3>
            <p className="text-gray-600">嫩绿的树叶在阳光下闪烁，森林里充满生机与希望。</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <img 
              src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20butterfly%20on%20spring%20flower%20colorful%20butterfly%20purple%20flower%20macro%20photography&image_size=portrait_4_3" 
              alt="蝴蝶与花朵"
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-green-700 mb-2">蝴蝶翩翩</h3>
            <p className="text-gray-600">美丽的蝴蝶在花丛中翩翩起舞，传递春天的讯息。</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <img 
              src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=baby%20animals%20in%20spring%20cute%20lambs%20playing%20green%20meadow%20sunny%20day%20warm&image_size=landscape_16_9" 
              alt="春日小动物"
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-green-700 mb-2">新生萌宠</h3>
            <p className="text-gray-600">可爱的小动物们在草地上嬉戏，感受春天的温暖。</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <img 
              src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=rainbow%20after%20spring%20rain%20fresh%20green%20grass%20water%20drops%20beautiful%20sky&image_size=landscape_16_9" 
              alt="雨后彩虹"
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-green-700 mb-2">雨后彩虹</h3>
            <p className="text-gray-600">春雨过后，彩虹横跨天际，带来美好的希望。</p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-green-800 text-xl">🌱 春天是万物复苏的季节，让我们一起感受大自然的美好！ 🌱</p>
        </div>
      </div>
    </div>
  );
}