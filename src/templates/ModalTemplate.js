// 統一されたモーダルテンプレート - 北海道スタイルに基づく

// モーダルHTML構造
const modalHTML = `
<!-- モーダル -->
<div id="city-modal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 opacity-0 invisible transition-all duration-300">
  <div class="bg-white rounded-xl w-full max-w-2xl mx-4 p-6 relative max-h-[90vh] overflow-y-auto transform scale-95 transition-transform duration-300">
    
    <h2 id="modal-title" class="text-2xl font-bold mb-2"></h2>
    <p id="modal-features" class="text-gray-600 mb-4"></p>

    <div class="grid grid-cols-2 gap-4 mb-6 text-sm">
      <div class="bg-gray-50 p-3 rounded-lg">
        <strong class="text-gray-700">人口:</strong> 
        <span id="modal-population" class="text-gray-900"></span>
      </div>
      <div class="bg-gray-50 p-3 rounded-lg">
        <strong class="text-gray-700">外国人人口:</strong> 
        <span id="modal-foreign-population" class="text-gray-900"></span>
      </div>
      <div class="bg-gray-50 p-3 rounded-lg">
        <strong class="text-gray-700">英語対応病院:</strong> 
        <span id="modal-english-hospital" class="text-gray-900"></span>
      </div>
      <div class="bg-gray-50 p-3 rounded-lg">
        <strong class="text-gray-700">空港アクセス:</strong> 
        <span id="modal-airport" class="text-gray-900"></span>
      </div>
      <div class="bg-gray-50 p-3 rounded-lg">
        <strong class="text-gray-700">家賃相場:</strong> 
        <span id="modal-rent" class="text-gray-900"></span>
      </div>
      <div class="bg-gray-50 p-3 rounded-lg col-span-2">
        <strong class="text-gray-700">おすすめ:</strong> 
        <span id="modal-recommend" class="text-gray-900"></span>
      </div>
    </div>

    <p id="modal-description" class="text-gray-700 mb-6"></p>

    <div id="modal-tags" class="flex flex-wrap gap-2 mb-6"></div>

    <div>
      <button id="modal-article-link" type="button" class="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors">
        📖 詳しい記事を見る
      </button>
    </div>
  </div>
</div>
`;

// JavaScript関数
const modalJS = `
// 市区町村モーダルを開く
function openCityModal(cityKey) {
  if (!cityData || !cityData[cityKey]) {
    console.error('City data not found for:', cityKey);
    return;
  }
  
  const city = cityData[cityKey];

  // 基本情報を設定
  document.getElementById('modal-title').textContent = city.title || '';
  document.getElementById('modal-features').textContent = city.features || '';
  document.getElementById('modal-population').textContent = city.population || '';
  document.getElementById('modal-foreign-population').textContent = city.foreignPopulation || '';
  document.getElementById('modal-english-hospital').textContent = city.englishHospital || '';
  document.getElementById('modal-airport').textContent = city.airport || '';
  document.getElementById('modal-rent').textContent = city.rent || '';
  document.getElementById('modal-recommend').textContent = city.recommend || '';
  document.getElementById('modal-description').textContent = city.description || '';

  // タグを設定（統一された青色スタイル）
  const tagsContainer = document.getElementById('modal-tags');
  tagsContainer.innerHTML = '';
  if (city.tags && Array.isArray(city.tags)) {
    city.tags.forEach(tag => {
      const tagElement = document.createElement('span');
      tagElement.textContent = tag;
      tagElement.className = 'text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium';
      tagsContainer.appendChild(tagElement);
    });
  }

  // 記事リンクボタンの設定
  const articleLinkBtn = document.getElementById('modal-article-link');
  if (articleLinkBtn && city.pageUrl) {
    articleLinkBtn.onclick = function() {
      window.location.href = city.pageUrl;
    };
  }

  // モーダルを表示（アニメーション付き）
  const modal = document.getElementById('city-modal');
  if (modal) {
    modal.classList.remove('invisible', 'opacity-0');
    modal.classList.add('opacity-100');
    const modalContent = modal.querySelector('.bg-white');
    if (modalContent) {
      modalContent.classList.remove('scale-95');
      modalContent.classList.add('scale-100');
    }
    document.body.style.overflow = 'hidden';
  }
}

// モーダルを閉じる
function closeModal() {
  const modal = document.getElementById('city-modal');
  if (modal) {
    modal.classList.add('opacity-0');
    const modalContent = modal.querySelector('.bg-white');
    if (modalContent) {
      modalContent.classList.add('scale-95');
      modalContent.classList.remove('scale-100');
    }
    
    setTimeout(() => {
      modal.classList.add('invisible');
      document.body.style.overflow = 'auto';
    }, 300);
  }
}

// モーダルイベントリスナー
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('city-modal');
  if (!modal) return;

  // モーダル背景クリックで閉じる
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // ESCキーでモーダルを閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('invisible')) {
      closeModal();
    }
  });
});
`;