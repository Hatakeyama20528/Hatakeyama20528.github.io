/**
 * プロジェクト詳細ページのJavaScript
 * Markdown対応版
 */

// ======================
// 定数定義
// ======================
const PROJECT_CONFIG = {
    PROJECTS_DATA_URL: 'data/projects.json',
    LEGACY_DATA_URL: 'data/projects-legacy.json' // フォールバック用
};

// ======================
// Markdownパーサー（marked.jsを使用）
// ======================
class MarkdownRenderer {
    /**
     * MarkdownをHTMLに変換
     */
    static async render(markdown) {
        if (typeof marked !== 'undefined') {
            // 動画記法を事前処理（marked.jsの前に変換）
            markdown = markdown.replace(/\[video:(.*?)\]/g, (match, videoPath) => {
                return `<video src="${videoPath}" autoplay loop muted playsinline class="w-full object-contain rounded-lg shadow-md bg-gray-200 p-1"></video>`;
            });

            // marked.jsが利用可能な場合
            marked.setOptions({
                breaks: true,
                gfm: true,
                headerIds: true,
                mangle: false
            });
            return marked.parse(markdown);
        } else {
            // フォールバック：簡易的な変換
            return MarkdownRenderer.simpleParse(markdown);
        }
    }

    /**
     * 簡易Markdownパーサー（marked.jsが無い場合のフォールバック）
     */
    static simpleParse(markdown) {
        let html = markdown;
        
        // 見出し
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
        
        // 太字
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // リンク
        html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
        
        // 画像
        html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="cursor-pointer">');
        
        // 動画
        html = html.replace(/\[video:(.*?)\]/g, '<video src="$1" autoplay loop muted playsinline class="w-full object-contain rounded-lg shadow-md bg-gray-200 p-1"></video>');
        
        // 段落
        html = html.replace(/\n\n/g, '</p><p>');
        html = '<p>' + html + '</p>';
        
        return html;
    }

    /**
     * Markdownファイルを読み込んでHTMLに変換
     */
    static async loadAndRender(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const markdown = await response.text();
            return await MarkdownRenderer.render(markdown);
        } catch (error) {
            console.error('Markdownファイルの読み込みに失敗しました:', error);
            return '<p class="text-red-500">コンテンツの読み込みに失敗しました。</p>';
        }
    }
}

// ======================
// プロジェクト詳細管理クラス
// ======================
class ProjectDetailManager {
    constructor() {
        this.projects = {};
        this.legacyProjects = {};
    }

    /**
     * プロジェクトデータを読み込み
     */
    async loadProjectsData() {
        try {
            // 新形式のデータを読み込み
            const response = await fetch(PROJECT_CONFIG.PROJECTS_DATA_URL);
            if (response.ok) {
                const projectsArray = await response.json();
                projectsArray.forEach(project => {
                    this.projects[project.id] = project;
                });
            }
        } catch (error) {
            console.error('プロジェクトデータの読み込みに失敗しました:', error);
        }

        // レガシーデータも読み込み（フォールバック）
        try {
            const legacyResponse = await fetch(PROJECT_CONFIG.LEGACY_DATA_URL);
            if (legacyResponse.ok) {
                this.legacyProjects = await legacyResponse.json();
            }
        } catch (error) {
            console.warn('レガシーデータの読み込みをスキップしました');
        }
    }

    /**
     * プロジェクトIDからプロジェクトデータを取得
     */
    getProject(projectId) {
        return this.projects[projectId] || this.legacyProjects[projectId] || null;
    }

    /**
     * プロジェクト詳細を構築
     */
    async buildProjectDetails(project) {
        // 基本情報セクション
        const detailsHtml = this.buildDetailsSection(project);
        
        // 概要セクション
        let descriptionHtml = '';
        if (project.descriptionFile) {
            // Markdownファイルから読み込み
            const content = await MarkdownRenderer.loadAndRender(project.descriptionFile);
            descriptionHtml = `
                <div class="markdown-body mt-8">
                    ${content}
                </div>
            `;
        } else if (project.description) {
            // 従来の形式（HTMLまたはテキスト）
            descriptionHtml = `
                <div class="bg-white p-8 rounded-lg">
                    <h2 class="text-2xl font-bold mb-4">概要</h2>
                    <p class="text-gray-700 leading-relaxed mb-8">${project.description}</p>
                    
                    <h2 class="text-2xl font-bold mb-4">詳細情報</h2>
                    <dl class="divide-y divide-gray-200">
                        ${detailsHtml}
                    </dl>
                </div>
            `;
            
            // richContentがある場合
            if (project.richContent) {
                descriptionHtml += this.buildRichContent(project.richContent);
            }
        }
        
        return descriptionHtml;
    }

    /**
     * 詳細情報セクションを構築
     */
    buildDetailsSection(project) {
        const details = [
            { label: '開発環境', value: project.env },
            { label: '制作期間', value: project.period },
            { label: '担当箇所', value: project.role },
            { label: '開発人数', value: project.teamSize }
        ];

        return details.map(detail => `
            <div class="flex flex-col sm:flex-row py-3 border-b">
                <dt class="sm:w-1/4 font-semibold text-gray-800">${detail.label}</dt>
                <dd class="sm:w-3/4 text-gray-600 whitespace-pre-line">${detail.value}</dd>
            </div>
        `).join('');
    }

    /**
     * リッチコンテンツセクションを構築（レガシー対応）
     */
    buildRichContent(richContent) {
        return richContent.map(section => `
            <div class="bg-white p-8 rounded-lg mt-8">
                <h3 class="text-2xl font-bold mb-4">${section.title}</h3>
                <div class="text-gray-700 leading-relaxed space-y-4">${section.content}</div>
            </div>
        `).join('');
    }

    /**
     * プロジェクト詳細ページをレンダリング
     */
    async renderProjectPage(projectId, container) {
        const project = this.getProject(projectId);

        if (!project) {
            container.innerHTML = `
                <div class="text-center py-20">
                    <h1 class="text-2xl font-bold">Project Not Found</h1>
                    <p class="text-gray-500 mt-2">The requested project could not be found.</p>
                    <a href="index.html" class="mt-6 inline-block bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">Go back to Home</a>
                </div>
            `;
            return;
        }

        // タイトルを更新
        document.title = `${project.title} - Project Details`;

        // コンテンツを構築
        const detailsContent = await this.buildProjectDetails(project);

        container.innerHTML = `
            <h1 class="text-4xl md:text-5xl font-bold mb-4">${project.title}</h1>
            <div class="aspect-[16/9] my-8 rounded-lg overflow-hidden shadow-lg bg-gray-200">
                <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover">
            </div>
            ${detailsContent}
        `;

        // シンタックスハイライトを適用
        if (typeof hljs !== 'undefined') {
            setTimeout(() => {
                document.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightElement(block);
                });
            }, 100);
        }

        // 画像クリックイベントを設定
        this.setupImageModal();
    }

    /**
     * 画像拡大モーダルを設定
     */
    setupImageModal() {
        const modal = document.getElementById('image-modal');
        const modalImg = document.getElementById('modal-image');
        const closeBtn = document.getElementById('close-image-modal');

        if (!modal || !modalImg || !closeBtn) return;

        let zoom = 1;
        let isDragging = false;
        let dragStart = { x: 0, y: 0 };
        let imgOffset = { x: 0, y: 0 };
        let dragOffset = { x: 0, y: 0 };

        // 画像をリセット
        const resetModalImage = () => {
            zoom = 1;
            imgOffset = { x: 0, y: 0 };
            dragOffset = { x: 0, y: 0 };
            modalImg.style.transform = 'scale(1) translate(0px, 0px)';
        };

        // 画像クリックで拡大（markdown-body内の画像のみ）
        document.querySelectorAll('.markdown-body img').forEach(img => {
            img.addEventListener('click', function() {
                resetModalImage();
                modalImg.src = this.src;
                modalImg.alt = this.alt;
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            });
        });

        // モーダルを閉じる
        closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
            resetModalImage();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
                resetModalImage();
            }
        });

        // ドラッグ機能
        modalImg.style.transition = 'transform 0.1s';
        modalImg.style.cursor = 'grab';

        modalImg.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return;
            isDragging = true;
            dragStart.x = e.clientX;
            dragStart.y = e.clientY;
            dragOffset.x = imgOffset.x;
            dragOffset.y = imgOffset.y;
            modalImg.style.cursor = 'grabbing';
            document.body.style.userSelect = 'none';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - dragStart.x;
            const dy = e.clientY - dragStart.y;
            modalImg.style.transform = `scale(${zoom}) translate(${dragOffset.x + dx}px, ${dragOffset.y + dy}px)`;
        });

        document.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            modalImg.style.cursor = 'grab';
            document.body.style.userSelect = '';
            const dx = e.clientX - dragStart.x;
            const dy = e.clientY - dragStart.y;
            imgOffset.x = dragOffset.x + dx;
            imgOffset.y = dragOffset.y + dy;
        });

        // ホイールでズーム
        modalImg.addEventListener('wheel', (e) => {
            e.preventDefault();
            zoom = e.deltaY < 0 
                ? Math.min(zoom + 0.1, 5) 
                : Math.max(zoom - 0.1, 0.2);
            modalImg.style.transform = `scale(${zoom}) translate(${imgOffset.x}px, ${imgOffset.y}px)`;
        });

        // タッチでズーム
        let lastDist = null;
        modalImg.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                lastDist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
            }
        });

        modalImg.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2 && lastDist !== null) {
                const newDist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                const delta = (newDist - lastDist) / 200;
                zoom = Math.min(Math.max(zoom + delta, 0.2), 5);
                modalImg.style.transform = `scale(${zoom}) translate(${imgOffset.x}px, ${imgOffset.y}px)`;
                lastDist = newDist;
                e.preventDefault();
            }
        }, { passive: false });

        modalImg.addEventListener('touchend', (e) => {
            if (e.touches.length < 2) lastDist = null;
        });
    }
}

// ======================
// メイン初期化関数
// ======================
async function initProjectDetail() {
    const contentContainer = document.getElementById('project-content');
    if (!contentContainer) {
        console.error('project-content要素が見つかりません');
        return;
    }

    // URLパラメータからプロジェクトIDを取得
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');

    if (!projectId) {
        contentContainer.innerHTML = `
            <div class="text-center py-20">
                <h1 class="text-2xl font-bold">Invalid Request</h1>
                <p class="text-gray-500 mt-2">No project ID specified.</p>
                <a href="index.html" class="mt-6 inline-block bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">Go back to Home</a>
            </div>
        `;
        return;
    }

    // プロジェクト詳細を読み込んで表示
    const manager = new ProjectDetailManager();
    await manager.loadProjectsData();
    await manager.renderProjectPage(projectId, contentContainer);
}

// ======================
// ページ読み込み時に実行
// ======================
document.addEventListener('DOMContentLoaded', initProjectDetail);
