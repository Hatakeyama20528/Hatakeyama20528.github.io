/**
 * トピック詳細ページのJavaScript
 */

// ======================
// 定数定義
// ======================
const TOPIC_CONFIG = {
    TOPICS_DATA_URL: 'data/topics.json',
    PROJECTS_DATA_URL: 'data/projects.json'
};

// ======================
// トピック詳細管理クラス
// ======================
class TopicDetailManager {
    constructor() {
        this.topics = {};
        this.projects = {};
    }

    /**
     * トピックとプロジェクトデータを読み込み
     */
    async loadData() {
        try {
            // トピックデータを読み込み
            const topicsResponse = await fetch(TOPIC_CONFIG.TOPICS_DATA_URL);
            if (topicsResponse.ok) {
                const topicsArray = await topicsResponse.json();
                topicsArray.forEach(topic => {
                    this.topics[topic.id] = topic;
                });
            }

            // プロジェクトデータを読み込み
            const projectsResponse = await fetch(TOPIC_CONFIG.PROJECTS_DATA_URL);
            if (projectsResponse.ok) {
                const projectsArray = await projectsResponse.json();
                projectsArray.forEach(project => {
                    this.projects[project.id] = project;
                });
            }
        } catch (error) {
            console.error('データの読み込みに失敗しました:', error);
        }
    }

    /**
     * トピックIDからトピックデータを取得
     */
    getTopic(topicId) {
        return this.topics[topicId] || null;
    }

    /**
     * トピック詳細ページをレンダリング
     */
    renderTopicPage(topicId, container) {
        const topic = this.getTopic(topicId);

        if (!topic) {
            container.innerHTML = `
                <div class="text-center py-20">
                    <h1 class="text-2xl font-bold">Topic Not Found</h1>
                    <p class="text-gray-500 mt-2">The requested topic could not be found.</p>
                    <a href="index.html" class="mt-6 inline-block bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">Go back to Home</a>
                </div>
            `;
            return;
        }

        // タイトルを更新
        document.title = `${topic.title} - 技術トピック詳細`;

        // ヘッダーセクション
        const headerHtml = `
            <div class="text-center mb-12" data-aos="fade-up">
                <div class="text-6xl mb-4">${topic.icon}</div>
                <h1 class="text-4xl md:text-5xl font-bold mb-4 font-japanese">${topic.title}</h1>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto font-japanese">${topic.description}</p>
            </div>
        `;

        // タグセクション
        const tagsHtml = `
            <div class="flex flex-wrap justify-center gap-3 mb-12" data-aos="fade-up" data-aos-delay="100">
                ${topic.tags.map(tag => `
                    <span class="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium font-japanese">
                        ${tag}
                    </span>
                `).join('')}
            </div>
        `;

        // メイン画像セクション
        const imageHtml = topic.image ? `
            <div class="aspect-[16/9] mb-12 rounded-lg overflow-hidden shadow-lg bg-gray-200" data-aos="fade-up" data-aos-delay="200">
                <img src="${topic.image}" alt="${topic.title}" class="w-full h-full object-cover">
            </div>
        ` : '';

        // 関連プロジェクトセクション
        const relatedProjectsHtml = this.buildRelatedProjects(topic.relatedProjects);

        container.innerHTML = `
            ${headerHtml}
            ${tagsHtml}
            ${imageHtml}
            ${relatedProjectsHtml}
        `;

        // AOSアニメーションを再初期化
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }

    /**
     * 関連プロジェクトセクションを構築
     */
    buildRelatedProjects(projectIds) {
        if (!projectIds || projectIds.length === 0) {
            return '';
        }

        const projectsHtml = projectIds.map((projectId, index) => {
            const project = this.projects[projectId];
            if (!project) return '';

            return `
                <a href="project-template.html?project=${project.id}" 
                   class="project-card block bg-white rounded-lg overflow-hidden shadow-md"
                   data-aos="fade-up" 
                   data-aos-delay="${300 + (index * 100)}">
                    <div class="aspect-[16/9] bg-gray-200">
                        <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover">
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold mb-2 font-japanese">${project.title}</h3>
                        <div class="flex flex-wrap gap-2 mb-3">
                            <span class="text-sm text-gray-500 font-japanese">${project.env}</span>
                        </div>
                        <div class="text-sm text-gray-600 font-japanese">
                            <p><strong>期間:</strong> ${project.period}</p>
                            <p><strong>担当:</strong> ${project.role}</p>
                        </div>
                    </div>
                </a>
            `;
        }).join('');

        return `
            <div class="mt-16">
                <h2 class="text-3xl font-bold text-center mb-8 font-japanese" data-aos="fade-up">関連プロジェクト</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${projectsHtml}
                </div>
            </div>
        `;
    }
}

// ======================
// メイン初期化関数
// ======================
async function initTopicDetail() {
    // AOS初期化
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    const contentContainer = document.getElementById('topic-content');
    if (!contentContainer) {
        console.error('topic-content要素が見つかりません');
        return;
    }

    // URLパラメータからトピックIDを取得
    const urlParams = new URLSearchParams(window.location.search);
    const topicId = urlParams.get('topic');

    if (!topicId) {
        contentContainer.innerHTML = `
            <div class="text-center py-20">
                <h1 class="text-2xl font-bold">Invalid Request</h1>
                <p class="text-gray-500 mt-2">No topic ID specified.</p>
                <a href="index.html" class="mt-6 inline-block bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">Go back to Home</a>
            </div>
        `;
        return;
    }

    // トピック詳細を読み込んで表示
    const manager = new TopicDetailManager();
    await manager.loadData();
    manager.renderTopicPage(topicId, contentContainer);
}

// ======================
// ページ読み込み時に実行
// ======================
document.addEventListener('DOMContentLoaded', initTopicDetail);
