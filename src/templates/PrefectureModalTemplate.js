/**
 * 都道府県ページ用モーダル実装テンプレート
 * 色テーマと都道府県名をパラメータとして受け取る汎用テンプレート
 */

/**
 * モーダルHTMLを生成
 * @param {string} colorTheme - カラーテーマ (red, blue, green, purple, orange, etc.)
 * @returns {string} モーダルHTML
 */
function generateModalHTML(colorTheme = 'red') {
  return `
  <!-- Modal -->
  <div id="city-modal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 opacity-0 invisible transition-all duration-300">
    <div class="bg-white rounded-xl w-full max-w-2xl mx-4 p-6 relative max-h-[90vh] overflow-y-auto transform scale-95 transition-transform duration-300">
      <button id="modal-close" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold">&times;</button>

      <img id="modal-image" src="" alt="" class="w-full h-56 object-cover rounded-lg mb-4" />
      
      <h2 id="modal-title" class="text-2xl font-bold mb-2"></h2>
      <p id="modal-features" class="text-gray-600 mb-4"></p>

      <div class="grid grid-cols-2 gap-4 mb-6 text-sm">
        <div class="bg-gray-50 p-3 rounded">
          <strong class="text-gray-700">人口:</strong> 
          <span id="modal-population" class="text-gray-900"></span>
        </div>
        <div class="bg-gray-50 p-3 rounded">
          <strong class="text-gray-700">外国人人口:</strong> 
          <span id="modal-foreign-population" class="text-gray-900"></span>
        </div>
        <div class="bg-gray-50 p-3 rounded">
          <strong class="text-gray-700">英語対応病院:</strong> 
          <span id="modal-english-hospital" class="text-gray-900"></span>
        </div>
        <div class="bg-gray-50 p-3 rounded">
          <strong class="text-gray-700">空港アクセス:</strong> 
          <span id="modal-airport" class="text-gray-900"></span>
        </div>
        <div class="bg-gray-50 p-3 rounded">
          <strong class="text-gray-700">家賃相場:</strong> 
          <span id="modal-rent" class="text-gray-900"></span>
        </div>
        <div class="bg-gray-50 p-3 rounded col-span-2">
          <strong class="text-gray-700">おすすめ:</strong> 
          <span id="modal-recommend" class="text-gray-900"></span>
        </div>
      </div>

      <p id="modal-description" class="text-gray-700 mb-6"></p>

      <div id="modal-tags" class="flex flex-wrap gap-2 mb-6"></div>

      <div class="flex gap-3">
        <a id="modal-article-link" href="#" 
           class="flex-1 text-center bg-${colorTheme}-600 text-white py-3 px-6 rounded-lg hover:bg-${colorTheme}-700 transition-colors">
          📖 詳しい記事を見る
        </a>
        <button id="close-modal-btn"
                class="bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors">
          閉じる
        </button>
      </div>
    </div>
  </div>`;
}

/**
 * モーダル制御JavaScriptを生成
 * @param {string} cityDataVarName - 市区町村データ変数名 (例: "tokyoCities", "osakaCities")
 * @param {string} colorTheme - カラーテーマ
 * @returns {string} JavaScript コード
 */
function generateModalScript(cityDataVarName, colorTheme = 'red') {
  return `
  <script>
    let currentCityKey = '';
    const modal = document.getElementById('city-modal');
    const modalClose = document.getElementById('modal-close');

    // モーダルを開く
    function openCityModal(cityKey) {
      currentCityKey = cityKey;
      const city = ${cityDataVarName}[cityKey];
      
      if (!city) {
        console.error('City data not found for key:', cityKey);
        return;
      }

      // モーダル内容を更新
      document.getElementById('modal-image').src = city.image || '';
      document.getElementById('modal-image').alt = city.title || '';
      document.getElementById('modal-title').textContent = city.title || '';
      document.getElementById('modal-features').textContent = city.features || '';
      document.getElementById('modal-population').textContent = city.population || '';
      document.getElementById('modal-foreign-population').textContent = city.foreignPopulation || '';
      document.getElementById('modal-english-hospital').textContent = city.englishHospital || '';
      document.getElementById('modal-airport').textContent = city.airport || '';
      document.getElementById('modal-rent').textContent = city.rent || '';
      document.getElementById('modal-recommend').textContent = city.recommend || '';
      document.getElementById('modal-description').textContent = city.description || '';
      document.getElementById('modal-article-link').href = city.pageUrl || '#';

      // タグを表示
      const tagsContainer = document.getElementById('modal-tags');
      tagsContainer.innerHTML = '';
      if (city.tags && Array.isArray(city.tags)) {
        city.tags.forEach(tag => {
          const tagElement = document.createElement('span');
          tagElement.className = 'text-xs bg-${colorTheme}-100 text-${colorTheme}-800 px-3 py-1 rounded-full font-medium';
          tagElement.textContent = tag;
          tagsContainer.appendChild(tagElement);
        });
      }

      // モーダルを表示（アニメーション付き）
      modal.classList.remove('invisible', 'opacity-0');
      modal.classList.add('opacity-100');
      modal.querySelector('.bg-white').classList.remove('scale-95');
      modal.querySelector('.bg-white').classList.add('scale-100');
      document.body.style.overflow = 'hidden';
    }

    // モーダルを閉じる
    function closeModal() {
      modal.classList.add('opacity-0');
      modal.querySelector('.bg-white').classList.add('scale-95');
      modal.querySelector('.bg-white').classList.remove('scale-100');
      
      setTimeout(() => {
        modal.classList.add('invisible');
        document.body.style.overflow = 'auto';
      }, 300);
      currentCityKey = '';
    }

    // イベントリスナーを設定
    document.addEventListener('DOMContentLoaded', function() {
      const closeModalBtn = document.getElementById('close-modal-btn');
      if (modalClose) modalClose.addEventListener('click', closeModal);
      if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

      // モーダル背景クリックで閉じる
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            closeModal();
          }
        });
      }

      // ESCキーで閉じる
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.classList.contains('invisible')) {
          closeModal();
        }
      });
    });
  </script>`;
}

/**
 * 都道府県別のカラーテーママッピング
 */
const prefectureColorThemes = {
  tokyo: 'red',
  osaka: 'orange', 
  kanagawa: 'blue',
  aichi: 'green',
  fukuoka: 'purple',
  hokkaido: 'indigo',
  kyoto: 'pink',
  hyogo: 'teal',
  saitama: 'emerald',
  chiba: 'cyan',
  // その他の都道府県はデフォルト色を使用
};

/**
 * 都道府県名からカラーテーマを取得
 * @param {string} prefectureName - 都道府県名（ローマ字）
 * @returns {string} カラーテーマ
 */
function getColorTheme(prefectureName) {
  return prefectureColorThemes[prefectureName.toLowerCase()] || 'blue';
}

module.exports = {
  generateModalHTML,
  generateModalScript,
  getColorTheme,
  prefectureColorThemes
};