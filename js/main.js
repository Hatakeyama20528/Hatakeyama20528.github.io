/**
 * ポートフォリオサイトのメインJavaScript
 */

// ======================
// 定数定義
// ======================
const CONFIG = {
    SLIDER_INTERVAL: 5000,
    AOS_DURATION: 800,
    AOS_OFFSET: 100,
    PARALLAX_SPEED: 0.5,
    PROJECTS_DATA_URL: 'data/projects.json'
};

// ======================
// ユーティリティ関数
// ======================
const Utils = {
    /**
     * 要素を作成してプロパティを設定
     */
    createElement(tag, className, attributes = {}) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        return element;
    },

    /**
     * データ属性を設定
     */
    setDataAttribute(element, key, value) {
        element.dataset[key] = value;
    }
};

// ======================
// スライダー管理クラス
// ======================
class HeroSlider {
    constructor(sliderElement, dotsContainer) {
        this.slider = sliderElement;
        this.dotsContainer = dotsContainer;
        this.currentSlide = 0;
        this.slideInterval = null;
        this.slides = [];
    }

    /**
     * スライドを表示
     */
    showSlide(index) {
        if (!this.slides.length) return;

        const targetSlide = this.slides[index];
        const slideWidth = targetSlide.offsetWidth;
        const slideMargin = parseFloat(window.getComputedStyle(targetSlide).marginLeft) * 2;
        const offset = -(index * (slideWidth + slideMargin)) + 
                      (this.slider.parentElement.offsetWidth - slideWidth) / 2 - 
                      slideMargin / 2;

        this.slider.style.transform = `translateX(${offset}px)`;

        // スライドのアクティブ状態を更新
        this.slides.forEach((slide, i) => {
            slide.classList.toggle('is-active', i === index);
        });

        // ドットの状態を更新
        const dots = this.dotsContainer.querySelectorAll('button');
        dots.forEach((dot, i) => {
            dot.classList.toggle('bg-white', i === index);
            dot.classList.toggle('bg-white/50', i !== index);
        });

        this.currentSlide = index;
    }

    /**
     * スライドを変更
     */
    changeSlide(offset) {
        const totalSlides = this.slides.length;
        const newIndex = (this.currentSlide + offset + totalSlides) % totalSlides;
        this.showSlide(newIndex);
    }

    /**
     * 自動スライドを開始
     */
    start() {
        this.stop();
        this.slideInterval = setInterval(() => this.changeSlide(1), CONFIG.SLIDER_INTERVAL);
    }

    /**
     * 自動スライドを停止
     */
    stop() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }

    /**
     * スライドリストを更新
     */
    updateSlides() {
        this.slides = this.slider.querySelectorAll('.slide');
    }

    /**
     * リサイズイベントハンドラ
     */
    handleResize() {
        this.showSlide(this.currentSlide);
    }
}

// ======================
// プロジェクト管理クラス
// ======================
class ProjectManager {
    constructor() {
        this.projects = [];
        this.slider = null;
    }

    /**
     * プロジェクトデータを読み込み
     */
    async loadProjects() {
        try {
            const response = await fetch(CONFIG.PROJECTS_DATA_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.projects = await response.json();
            return this.projects;
        } catch (error) {
            console.error('プロジェクトデータの読み込みに失敗しました:', error);
            return [];
        }
    }

    /**
     * スライダーとカードを作成
     */
    createSliderAndCards(sliderElement, dotsContainer, projectGrid) {
        this.projects.forEach((project, index) => {
            this.createSlide(sliderElement, project, index);
            this.createDot(dotsContainer, index);
            this.createProjectCard(projectGrid, project);
        });
    }

    /**
     * スライドを作成
     */
    createSlide(container, project, index) {
        const slide = Utils.createElement('a', 'slide', {
            href: `project-template.html?project=${project.id}`
        });
        Utils.setDataAttribute(slide, 'index', index);
        
        slide.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-6">
                <h3 class="text-white text-xl md:text-3xl text-display font-japanese">${project.title}</h3>
                <p class="text-white/80 text-md mt-1 hidden md:block font-medium">${project.env}</p>
            </div>
        `;
        
        container.appendChild(slide);
    }

    /**
     * ドットを作成
     */
    createDot(container, index) {
        const dot = Utils.createElement('button', 'w-2.5 h-2.5 rounded-full transition-colors bg-white/50 hover:bg-white/75');
        Utils.setDataAttribute(dot, 'index', index);
        container.appendChild(dot);
    }

    /**
     * プロジェクトカードを作成
     */
    createProjectCard(container, project) {
        const card = Utils.createElement('a', 'project-card block bg-gray-50 rounded-lg overflow-hidden shadow-md', {
            href: `project-template.html?project=${project.id}`
        });
        
        card.innerHTML = `
            <div class="aspect-[4/3] bg-gray-200">
                <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover">
            </div>
            <div class="p-5">
                <h3 class="text-display text-lg font-japanese">${project.title}</h3>
                <p class="text-gray-600 text-sm mt-1 font-medium">${project.env}</p>
            </div>
        `;
        
        container.appendChild(card);
    }
}

// ======================
// イベントハンドラー設定
// ======================
function setupEventHandlers(slider) {
    // 次へボタン
    document.getElementById('next-slide')?.addEventListener('click', () => {
        slider.changeSlide(1);
        slider.start();
    });

    // 前へボタン
    document.getElementById('prev-slide')?.addEventListener('click', () => {
        slider.changeSlide(-1);
        slider.start();
    });

    // ドットクリック
    const dotsContainer = document.getElementById('slider-dots');
    dotsContainer?.addEventListener('click', (e) => {
        if (e.target.matches('button')) {
            const index = parseInt(e.target.dataset.index, 10);
            slider.showSlide(index);
            slider.start();
        }
    });

    // リサイズイベント
    window.addEventListener('resize', () => slider.handleResize());

    // 履歴書ボタン（存在する場合）
    const resumeBtn = document.getElementById('open-resume-modal');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('resume.pdf', '_blank');
        });
    }
}

// ======================
// パララックス効果
// ======================
function setupParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.parallax-bg');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * CONFIG.PARALLAX_SPEED}px)`;
        }
    });
}

// ======================
// AOS初期化
// ======================
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: CONFIG.AOS_DURATION,
            easing: 'ease-in-out',
            once: true,
            offset: CONFIG.AOS_OFFSET
        });
    }
}

// ======================
// メイン初期化関数
// ======================
async function initPortfolio() {
    // AOS初期化
    initAOS();

    // パララックス効果設定
    setupParallax();

    // プロジェクトマネージャー初期化
    const projectManager = new ProjectManager();
    await projectManager.loadProjects();

    // DOM要素取得
    const sliderElement = document.getElementById('hero-slider');
    const dotsContainer = document.getElementById('slider-dots');
    const projectGrid = document.getElementById('projects')?.querySelector('.grid');

    if (!sliderElement || !dotsContainer || !projectGrid) {
        console.error('必要なDOM要素が見つかりません');
        return;
    }

    // スライダーとカード作成
    projectManager.createSliderAndCards(sliderElement, dotsContainer, projectGrid);

    // スライダー初期化
    const heroSlider = new HeroSlider(sliderElement, dotsContainer);
    heroSlider.updateSlides();
    heroSlider.showSlide(0);
    heroSlider.start();

    // イベントハンドラー設定
    setupEventHandlers(heroSlider);
}

// ======================
// ページ読み込み時に実行
// ======================
document.addEventListener('DOMContentLoaded', initPortfolio);
