// Simple i18n utility
export const defaultLang = 'en';
export const languages = ['en', 'ja', 'zh', 'zh-TW', 'ko'];

export const translations = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      about: 'About',
      contact: 'Contact',
      case_studies: 'Case Studies',
      blog: 'Blog'
    },
    cta: {
      contact: 'Contact Us',
      get_started: 'Get Started',
      learn_more: 'Learn More'
    },
    footer: {
      company: 'Land Vista Global',
      description: 'Professional land due diligence services for foreign investors in Japan',
      rights: 'All rights reserved'
    }
  },
  ja: {
    nav: {
      home: 'ホーム',
      services: 'サービス',
      about: '会社概要',
      contact: 'お問い合わせ',
      case_studies: '事例紹介',
      blog: 'ブログ'
    },
    cta: {
      contact: 'お問い合わせ',
      get_started: '始める',
      learn_more: '詳しく見る'
    },
    footer: {
      company: 'ランドビスタグローバル',
      description: '日本の外国人投資家向け専門的土地調査サービス',
      rights: '全著作権所有'
    }
  },
  zh: {
    nav: {
      home: '首页',
      services: '服务',
      about: '关于我们',
      contact: '联系我们',
      case_studies: '案例研究',
      blog: '博客'
    },
    cta: {
      contact: '联系我们',
      get_started: '开始使用',
      learn_more: '了解更多'
    },
    footer: {
      company: '土地视野全球',
      description: '为日本外国投资者提供专业的土地尽职调查服务',
      rights: '版权所有'
    }
  },
  'zh-TW': {
    nav: {
      home: '首頁',
      services: '服務',
      about: '關於我們',
      contact: '聯絡我們',
      case_studies: '案例研究',
      blog: '部落格'
    },
    cta: {
      contact: '聯絡我們',
      get_started: '開始使用',
      learn_more: '瞭解更多'
    },
    footer: {
      company: '土地視野全球',
      description: '為日本外國投資者提供專業的土地盡職調查服務',
      rights: '版權所有'
    }
  },
  ko: {
    nav: {
      home: '홈',
      services: '서비스',
      about: '회사 소개',
      contact: '문의하기',
      case_studies: '사례 연구',
      blog: '블로그'
    },
    cta: {
      contact: '문의하기',
      get_started: '시작하기',
      learn_more: '자세히 보기'
    },
    footer: {
      company: '랜드 비스타 글로벌',
      description: '일본의 외국인 투자자를 위한 전문적인 토지 실사 서비스',
      rights: '모든 권리 보유'
    }
  }
};

export function getLangFromUrl(url: URL): string {
  const [, lang] = url.pathname.split('/');
  if (languages.includes(lang)) {
    return lang;
  }
  return defaultLang;
}

export function useTranslations(lang: string = defaultLang) {
  return function t(key: string): string {
    const keys = key.split('.');
    let value = translations[lang as keyof typeof translations];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k as keyof typeof value];
      } else {
        // Fallback to English
        value = translations[defaultLang as keyof typeof translations];
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey as keyof typeof value];
          } else {
            return key; // Return key if not found
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };
}