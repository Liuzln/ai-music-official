export const defaultLocale = 'zh-CN' as const

export const messages = {
  'zh-CN': {
    language: {
      zh: '中文',
      en: 'English',
      switch: '语言切换',
    },
    theme: {
      title: {
        system: '主题：跟随系统（当前{resolved}）',
        fixed: '主题：{mode}',
      },
      label: {
        dark: '暗色',
        light: '明亮',
        system: '跟随系统',
      },
    },
    nav: {
      features: '场景',
      workflow: '小语种',
      scenarios: '关于我们',
      faq: '联系我们',
    },
    actions: {
      tryNow: '立即体验',
      viewFeatures: '查看模板',
      business: '商务合作',
    },
    hero: {
      tag: 'AI 生成音乐 · 单页官网',
      title: '用一句话生成你的音乐灵感',
      subtitle:
        '{siteName} 面向内容创作者与音乐制作人：输入提示词，选择风格与情绪，即可生成可用于视频、游戏、广告的音乐草稿，并支持导出与二次编辑。',
      badges: {
        textToMusic: '文本生成音乐',
        styleControl: '风格/速度控制',
        stemsExport: '分轨导出',
        multiVersion: '快速迭代多版本',
      },
      disclaimer: '* 页面为展示用单页官网模板，功能与授权以实际产品为准。',
    },
    preview: {
      title: '生成预览',
      prompt: '提示词：Lo-fi / 雨夜 / 温暖 / 90 BPM',
      style: '风格',
      duration: '时长',
      export: '导出',
      listen: '试听',
      demo: '示意 UI',
    },
    sections: {
      templates: {
        title: '场景模板库',
        description: '面向不同内容场景，提供模板化结构与节奏点；切换卡片即可预览对应背景与示意 BGM。',
        current: '当前模板',
        bgmHint: '* BGM 为示意效果，需手动点击开启（浏览器可能限制自动播放）。',
      },
      models: {
        title: '小语种特化模型',
        description: '面向泰语、柬埔寨语等小语种内容，提供更贴近本地语感的模板与音色/韵律优化。',
        advantagesTitle: '产品优势',
        advantagesSubtitle: '把“可用”做到“好用”，更容易在商业化项目里交付。',
      },
      about: {
        title: '关于我们',
        description: '我们专注于 AI 音乐与配音的工程化落地：用模板、模型与工具链，让内容团队更快产出、更稳交付。',
      },
      contact: {
        title: '联系我们',
        description: '如果你在做短剧、漫剧、广告投放或小语种本地化，需要模板/模型定制与批量生产能力，欢迎联系 {siteName}。',
        note: '* 微信与邮箱展示区可通过环境变量配置；也可替换为二维码图片。',
      },
      features: {
        title: '软件功能',
        description: '聚焦“生成 + 控制 + 导出 + 二次编辑”，让创作从灵感到成品更顺畅。',
      },
      workflow: {
        title: '3 步完成创作',
        description: '让 AI 成为你的“灵感加速器”，而不是替代创作本身。',
        step: 'STEP {index}',
      },
      scenarios: {
        title: '适用场景',
        description: '从内容配乐到商业项目，快速产出多版本音乐素材。',
      },
      faq: {
        title: '常见问题',
        description: '你可能关心的几个问题，我们先在这里说明。',
      },
      cta: {
        title: '准备开始创作？',
        description: '打开 {siteName}，用更少的时间完成更多版本，专注于选择、编排与情绪表达。',
      },
      footerLinks: {
        features: '模板',
        workflow: '小语种',
        scenarios: '关于',
        faq: '联系',
      },
    },
    contact: {
      actions: {
        email: '发送邮件',
        copied: '已复制',
        copyWeChat: '复制微信',
        copyEmail: '复制邮箱',
      },
      wechat: {
        label: '微信',
        placeholder: '（待填写）',
        qrAlt: '微信二维码',
        qrPlaceholder: '后续可放二维码图片',
      },
      email: {
        label: '邮箱',
        placeholder: '（待填写）',
      },
    },
    templates: {
      bgm: {
        toggleOn: '开启 BGM',
        toggleOff: '关闭 BGM',
        labels: {
          lofi: 'Lo-fi',
          cinematic: '电影感',
          anime: '动漫感',
          punchy: '广告节奏',
          clean: '干净配音底',
        },
      },
      items: {
        general: {
          title: '综合场景',
          description: '覆盖短视频/直播/电商等通用模板',
          longDescription: '从开场抓点到结尾收束，提供通用结构与情绪曲线，适配多数内容节奏。',
          points: {
            0: '3s 开场抓点：快速进入主题',
            1: '情绪曲线：起 → 承 → 转 → 合',
            2: '节奏点标注：转场/字幕/卡点',
            3: '可一键生成多版本：不同风格备选',
          },
          tags: {
            0: '通用结构',
            1: '多版本',
            2: '快节奏',
          },
        },
        shortDrama: {
          title: '短剧模板',
          description: '剧情起承转合 + 卡点配乐',
          longDescription: '为剧情推进与转场节奏设计：情绪递进、高潮点、结尾留白更好控。',
          points: {
            0: '剧情节拍：冲突/反转/高潮',
            1: '镜头转场：卡点与呼吸位',
            2: '情绪推进：铺垫到爆发更自然',
            3: '适配配音：留出对白频段空间',
          },
          tags: {
            0: '剧情节拍',
            1: '反转高潮',
            2: '转场卡点',
          },
        },
        comic: {
          title: '漫剧模板',
          description: '更明快的节奏与风格色彩',
          longDescription: '适合漫改/轻剧情内容：段落更清晰，主题动机更突出，让画面更“有戏”。',
          points: {
            0: '主题动机：更强记忆点',
            1: '段落分明：适配分镜/字幕',
            2: '情绪切换：轻松/紧张/治愈',
            3: '风格可选：日系/电音/Lo-fi',
          },
          tags: {
            0: '主题动机',
            1: '段落清晰',
            2: '风格色彩',
          },
        },
        ads: {
          title: '广告模板',
          description: '强调卖点与节奏的短促结构',
          longDescription: '面向品牌片/投放素材：更短的铺垫、更强的节奏推进，突出产品卖点。',
          points: {
            0: '开场 1-2s 快速抓注意力',
            1: '节奏推进：卖点出现更“上头”',
            2: '口播友好：避免频段打架',
            3: '版本对比：不同风格快速 A/B',
          },
          tags: {
            0: '短促强节奏',
            1: '口播友好',
            2: '投放A/B',
          },
        },
        dub: {
          title: '漫剧配音',
          description: '对白优先：干净底噪与空间感',
          longDescription: '为配音/旁白优化：更干净的编配与空间，让对白更清晰、情绪更贴脸。',
          points: {
            0: '对白优先：中频留白',
            1: '空间控制：不遮盖人声',
            2: '情绪垫底：轻推不抢戏',
            3: '导出便捷：便于后期混音',
          },
          tags: {
            0: '对白清晰',
            1: '空间留白',
            2: '后期友好',
          },
        },
      },
    },
    models: {
      items: {
        thai: {
          title: '泰语模板卡片',
          description: '短剧、电商、旅游推广等泰语内容快速出片',
          bullets: {
            0: '泰语语料特化：更自然的语感与停连',
            1: '口播/配音友好：对白清晰不糊',
            2: '模板化生成：批量多版本更高效',
          },
        },
        khmer: {
          title: '柬埔寨模板卡片',
          description: '面向柬埔寨市场投放与本地化内容',
          bullets: {
            0: '柬埔寨语（Khmer）特化：发音更稳定',
            1: '本地热词/品牌词处理：更少读错',
            2: '多风格 BGM：更贴合投放素材节奏',
          },
        },
      },
      advantages: {
        corpus: {
          title: '本地语料 + 文本规范化',
          description: '自定义词典/品牌词/热词，降低读错与断句问题。',
        },
        control: {
          title: '可控参数与情绪模板',
          description: '语速、停连、重音、情绪强度可控，适配不同脚本节奏。',
        },
        voiceover: {
          title: '口播/配音频段优化',
          description: '编配更“给人声让路”，让对白更清晰、可理解。',
        },
        delivery: {
          title: '批量生成与稳定交付',
          description: '模板复用 + 批量多版本，适配投放/短剧的高频产出。',
        },
      },
    },
    about: {
      cases: {
        title: '商业化案例',
        description: '以下为脱敏示例，可根据实际客户/行业替换为真实案例与数据。',
        items: {
          shortDrama: {
            title: '出海短剧团队：模板化配乐 + 多语种配音',
            description: '为短剧切片与正片提供可控情绪曲线与卡点 BGM，同时支持配音底与混音交付。',
            note: '核心价值：节奏点一致、版本对比快、素材迭代更省人力。',
            metrics: {
              0: { label: '交付周期', value: '24-48h' },
              1: { label: '日均产出', value: '30+ 版本' },
            },
          },
          ads: {
            title: '品牌投放：广告模板 + A/B 多版本',
            description: '根据不同卖点与投放渠道生成多风格 BGM，支持口播友好编配。',
            note: '核心价值：提案更快、风格更可控、投放素材更新更及时。',
            metrics: {
              0: { label: 'A/B 轮次', value: '每周 3-5 轮' },
              1: { label: '素材适配', value: '多平台尺寸' },
            },
          },
          ecommerce: {
            title: '电商/直播：热词驱动的快速出片',
            description: '结合热门风格与商品卖点，生成短促抓耳的节奏素材，支持批量生成。',
            note: '核心价值：跟热点快、节奏更上头、覆盖更多商品场景。',
            metrics: {
              0: { label: '峰值产出', value: '100+ 条/天' },
              1: { label: '常用时长', value: '6-15s' },
            },
          },
        },
      },
      awards: {
        title: '比赛与获奖',
        description: '后续可替换为实拍图片/证书，支持珊格（栅格）展示。',
        placeholder: '待添加图片',
        items: {
          0: { title: '创新创业大赛 · 决赛入围', subtitle: '（示例）2025' },
          1: { title: '人工智能应用大赛 · 优胜奖', subtitle: '（示例）2024' },
          2: { title: '数字内容创新奖 · TOP10', subtitle: '（示例）2024' },
          3: { title: '音频技术挑战赛 · 复赛晋级', subtitle: '（示例）2023' },
          4: { title: '高校/产业联合赛 · 最佳产品', subtitle: '（示例）2023' },
          5: { title: '开源/社区评选 · 推荐项目', subtitle: '（示例）2022' },
        },
      },
      government: {
        title: '政府评比企业',
        description: '可替换为实际资质/认定/评比结果。',
        badges: {
          0: '创新型中小企业',
          1: '科技型中小企业',
          2: '高新技术企业（规划中）',
          3: '重点软件企业（规划中）',
        },
      },
      partners: {
        title: '合作伙伴',
        description: '面向内容团队、出海品牌、制作公司与平台方合作共创。',
        items: {
          0: '短剧出海团队',
          1: '电商品牌',
          2: '广告代理与制作公司',
          3: '游戏发行与运营',
          4: 'MCN / 内容机构',
          5: '高校 / 研究机构',
        },
      },
    },
    meta: {
      title: '{siteName} - AI 生成音乐，一键创作',
      description: '{siteName}：AI 生成音乐单页官网示例，展示文本生成音乐、风格控制、导出与二次编辑等能力。',
      keywords: 'AI生成音乐,AI音乐,音乐生成,文本生成音乐,配乐,BGM',
      ogTitle: '{siteName} - AI 生成音乐',
      twitterTitle: '{siteName} - AI 生成音乐',
      schemaName: '{siteName} - AI 生成音乐',
    },
    features: {
      items: {
        textToMusic: {
          title: '文本生成音乐',
          description: '输入提示词与场景描述，快速生成旋律、和声与编曲草稿。',
        },
        styleControl: {
          title: '风格与参数控制',
          description: '支持风格、情绪、速度（BPM）、时长等维度的可控生成。',
        },
        multiVersion: {
          title: '快速迭代多版本',
          description: '一键生成多个候选版本，便于挑选方向并持续优化。',
        },
        highQuality: {
          title: '高质量音频输出',
          description: '生成可直接用于内容配乐的音频素材，支持常用格式导出。',
        },
        stems: {
          title: '分轨导出与二次编辑',
          description: '支持分轨导出，进入 DAW 做混音、母带与细节打磨。',
        },
        licensing: {
          title: '授权与使用指引',
          description: '提供授权选项与使用建议，帮助更安心地发布与商用。',
        },
      },
    },
    workflow: {
      steps: {
        describe: {
          title: '描述你想要的音乐',
          description: '用一句话说明风格、情绪、场景与参考方向（支持中文提示词）。',
        },
        generate: {
          title: '选择参数并生成',
          description: '设置时长、速度等参数，一键生成多版本候选，快速预览筛选。',
        },
        export: {
          title: '导出并继续制作',
          description: '导出音频或分轨，进入你熟悉的工作流继续编排、混音与发布。',
        },
      },
    },
    scenarios: {
      items: {
        shortVideo: {
          title: '短视频 / 直播配乐',
          description: '快速产出多条 BGM，适配不同情绪与转场节奏。',
        },
        game: {
          title: '游戏与互动内容',
          description: '生成氛围音乐草稿，为关卡与场景提供灵感与素材。',
        },
        ads: {
          title: '商业广告与品牌片',
          description: '更快试错不同风格方向，提高提案效率。',
        },
        podcast: {
          title: '播客 / 片头片尾',
          description: '生成符合调性的片头片尾与提示音，统一品牌听感。',
        },
        library: {
          title: '创作者音乐素材库',
          description: '沉淀可复用的风格模板与素材片段，长期迭代。',
        },
        delivery: {
          title: '导出交付',
          description: '支持一键导出，便于与剪辑、制作、客户协作。',
        },
      },
    },
    faq: {
      items: {
        commercial: {
          q: '生成的音乐可以商用吗？',
          a: '是否可商用取决于你所选择的授权方案与服务条款。建议在发布前查看授权说明，并保留导出/订单记录以备查询。',
        },
        exportFormats: {
          q: '支持哪些导出格式？',
          a: '常见会提供 WAV/MP3 等音频导出，并可在部分版本中支持分轨导出，便于进入 DAW 做进一步制作。',
        },
        controlParams: {
          q: '我可以控制风格、BPM 和时长吗？',
          a: '可以。你可以通过提示词与参数设置控制风格、情绪、速度（BPM）与时长，并通过多版本生成快速迭代。',
        },
        chinesePrompt: {
          q: '是否支持中文提示词？',
          a: '支持。用中文描述场景与关键词即可，也可以混用英文风格词以获得更精确的风格指向。',
        },
      },
    },
  },
  en: {
    language: {
      zh: 'Chinese',
      en: 'English',
      switch: 'Language switch',
    },
    theme: {
      title: {
        system: 'Theme: System (currently {resolved})',
        fixed: 'Theme: {mode}',
      },
      label: {
        dark: 'Dark',
        light: 'Light',
        system: 'System',
      },
    },
    nav: {
      features: 'Scenarios',
      workflow: 'Minor languages',
      scenarios: 'About',
      faq: 'Contact',
    },
    actions: {
      tryNow: 'Try now',
      viewFeatures: 'View templates',
      business: 'Business',
    },
    hero: {
      tag: 'AI music generation · Landing page',
      title: 'Turn one sentence into music inspiration',
      subtitle:
        '{siteName} is built for creators and producers: type a prompt, pick a style and mood, and generate music drafts for videos, games, and ads—with export and post-editing support.',
      badges: {
        textToMusic: 'Text-to-music',
        styleControl: 'Style / tempo control',
        stemsExport: 'Stems export',
        multiVersion: 'Multi-version iteration',
      },
      disclaimer: '* Demo landing page template. Features and licensing follow the actual product.',
    },
    preview: {
      title: 'Generation preview',
      prompt: 'Prompt: Lo-fi / Rainy night / Cozy / 90 BPM',
      style: 'Style',
      duration: 'Duration',
      export: 'Export',
      listen: 'Listen',
      demo: 'Demo UI',
    },
    sections: {
      templates: {
        title: 'Scenario templates',
        description: 'Cards for different scenes. Switch templates to preview the background and a demo BGM.',
        current: 'Current template',
        bgmHint: '* Demo BGM for presentation only. Click to enable (autoplay restrictions may apply).',
      },
      models: {
        title: 'Localized models',
        description: 'Specialized templates and rhythm optimization for low-resource languages such as Thai and Khmer.',
        advantagesTitle: 'Product advantages',
        advantagesSubtitle: 'Built for real production: stable, controllable, and easy to deliver at scale.',
      },
      about: {
        title: 'About us',
        description: 'We productize AI music and dubbing with templates, models, and tooling—helping teams ship faster and deliver reliably.',
      },
      contact: {
        title: 'Contact',
        description:
          'Working on short dramas, comics, performance ads, or SEA localization? Reach out to {siteName} for templates, model tuning, and batch production.',
        note: '* Configure WeChat/email via env vars; you can also replace the QR area with an image.',
      },
      features: {
        title: 'Features',
        description: 'Focus on “Generate + Control + Export + Post-editing” to move from idea to final faster.',
      },
      workflow: {
        title: 'Create in 3 steps',
        description: 'Let AI be your inspiration accelerator, not a replacement.',
        step: 'STEP {index}',
      },
      scenarios: {
        title: 'Use cases',
        description: 'From content soundtracks to commercial work, ship multiple versions fast.',
      },
      faq: {
        title: 'FAQ',
        description: 'A few questions you may have—answered here.',
      },
      cta: {
        title: 'Ready to create?',
        description: 'Open {siteName}, ship more versions in less time, and focus on selection, arrangement, and emotion.',
      },
      footerLinks: {
        features: 'Templates',
        workflow: 'Languages',
        scenarios: 'About',
        faq: 'Contact',
      },
    },
    contact: {
      actions: {
        email: 'Email us',
        copied: 'Copied',
        copyWeChat: 'Copy WeChat',
        copyEmail: 'Copy email',
      },
      wechat: {
        label: 'WeChat',
        placeholder: '(TBD)',
        qrAlt: 'WeChat QR code',
        qrPlaceholder: 'Add a QR image later',
      },
      email: {
        label: 'Email',
        placeholder: '(TBD)',
      },
    },
    templates: {
      bgm: {
        toggleOn: 'Enable BGM',
        toggleOff: 'Disable BGM',
        labels: {
          lofi: 'Lo-fi',
          cinematic: 'Cinematic',
          anime: 'Anime',
          punchy: 'Punchy',
          clean: 'Clean bed',
        },
      },
      items: {
        general: {
          title: 'General scenes',
          description: 'A versatile template for short videos, livestreams, and e-commerce.',
          longDescription: 'A flexible structure with clear pacing and emotion flow—works for most content rhythms.',
          points: {
            0: 'Hook in the first 3s',
            1: 'Emotion curve: build → turn → resolve',
            2: 'Beat markers for transitions and cuts',
            3: 'Generate multiple versions for fast selection',
          },
          tags: {
            0: 'Versatile',
            1: 'Multi-version',
            2: 'Fast pacing',
          },
        },
        shortDrama: {
          title: 'Short drama template',
          description: 'Story beats + cut-friendly scoring',
          longDescription: 'Designed for narrative pacing: build-up, twist, climax, and controlled “breathing room”.',
          points: {
            0: 'Story beats: conflict / twist / climax',
            1: 'Cut points with breathing spaces',
            2: 'Natural emotional escalation',
            3: 'Voice-over friendly midrange space',
          },
          tags: {
            0: 'Story beats',
            1: 'Twist & climax',
            2: 'Cut points',
          },
        },
        comic: {
          title: 'Comic template',
          description: 'Brighter pacing with clearer style color',
          longDescription: 'For comic-style and light narrative: clearer sections and motifs to make visuals feel “alive”.',
          points: {
            0: 'Stronger motif and memorability',
            1: 'Clear sections for panels and captions',
            2: 'Smooth mood switching',
            3: 'Style options: J-pop / EDM / Lo-fi',
          },
          tags: {
            0: 'Motifs',
            1: 'Clear sections',
            2: 'Style color',
          },
        },
        ads: {
          title: 'Ad template',
          description: 'Short, punchy structure for highlights',
          longDescription: 'For brand films and performance creatives: less lead-in, stronger drive, clearer highlights.',
          points: {
            0: 'Grab attention in 1–2s',
            1: 'Punchy drive for key moments',
            2: 'Voiceover-friendly arrangement',
            3: 'Fast A/B with multiple styles',
          },
          tags: {
            0: 'Punchy',
            1: 'VO-friendly',
            2: 'A/B testing',
          },
        },
        dub: {
          title: 'Dubbing bed',
          description: 'Dialogue-first: clean and spacious',
          longDescription: 'Optimized for dubbing and narration: cleaner arrangement and space to keep dialogue clear.',
          points: {
            0: 'Dialogue-first midrange space',
            1: 'Controlled ambience, no masking',
            2: 'Supports emotion without stealing focus',
            3: 'Easy export for post mixing',
          },
          tags: {
            0: 'Dialogue clarity',
            1: 'Spacious',
            2: 'Post-friendly',
          },
        },
      },
    },
    models: {
      items: {
        thai: {
          title: 'Thai template card',
          description: 'Ship Thai content fast for short dramas, e-commerce, and tourism.',
          bullets: {
            0: 'Thai-tuned data: more natural phrasing and pauses',
            1: 'Voice-over friendly: keeps dialogue clear',
            2: 'Template-based generation: batch multi-versions efficiently',
          },
        },
        khmer: {
          title: 'Khmer template card',
          description: 'Built for Cambodia market ads and localization workflows.',
          bullets: {
            0: 'Khmer-tuned modeling: more stable pronunciation',
            1: 'Brand terms and hot words: fewer misreads',
            2: 'Multi-style BGMs: better fit for performance creatives',
          },
        },
      },
      advantages: {
        corpus: {
          title: 'Local data + text normalization',
          description: 'Custom dictionaries for brand terms and hot words to reduce misreads and awkward phrasing.',
        },
        control: {
          title: 'Controllable parameters',
          description: 'Control speaking pace, pauses, emphasis, and emotion to match different scripts.',
        },
        voiceover: {
          title: 'Voice-over friendly mixing',
          description: 'Arrangement that leaves room for speech so dialogue stays intelligible.',
        },
        delivery: {
          title: 'Batch generation & stable delivery',
          description: 'Reusable templates and batch multi-version generation for high-frequency production.',
        },
      },
    },
    about: {
      cases: {
        title: 'Commercial cases',
        description: 'Anonymized examples—replace with real customers and metrics when ready.',
        items: {
          shortDrama: {
            title: 'Overseas short dramas: template scoring + multilingual dubbing',
            description: 'Controlled emotion curves and cut-friendly BGMs, with dubbing beds and mix-ready delivery.',
            note: 'Value: consistent beat points, faster comparisons, and lower iteration cost.',
            metrics: {
              0: { label: 'Turnaround', value: '24–48h' },
              1: { label: 'Daily output', value: '30+ versions' },
            },
          },
          ads: {
            title: 'Performance marketing: ad templates + A/B multi-versions',
            description: 'Multi-style BGMs for different angles and channels, optimized for voice-over creatives.',
            note: 'Value: faster pitches, more controllable styles, and timely creative refresh.',
            metrics: {
              0: { label: 'A/B cycles', value: '3–5 / week' },
              1: { label: 'Adaptation', value: 'Multi-platform sizes' },
            },
          },
          ecommerce: {
            title: 'E-commerce & livestream: trend-driven fast production',
            description: 'Short, catchy rhythm assets driven by hot styles and product highlights—batch generation ready.',
            note: 'Value: faster trend response, punchier rhythm, broader SKU coverage.',
            metrics: {
              0: { label: 'Peak output', value: '100+ / day' },
              1: { label: 'Common length', value: '6–15s' },
            },
          },
        },
      },
      awards: {
        title: 'Competitions & awards',
        description: 'Replace with photos/certificates later. Responsive mosaic grid included.',
        placeholder: 'Add image later',
        items: {
          0: { title: 'Startup competition · Finalist', subtitle: '(Example) 2025' },
          1: { title: 'AI application contest · Winner', subtitle: '(Example) 2024' },
          2: { title: 'Digital content innovation · Top 10', subtitle: '(Example) 2024' },
          3: { title: 'Audio tech challenge · Advanced', subtitle: '(Example) 2023' },
          4: { title: 'University-industry hackathon · Best product', subtitle: '(Example) 2023' },
          5: { title: 'Community pick · Recommended project', subtitle: '(Example) 2022' },
        },
      },
      government: {
        title: 'Government recognitions',
        description: 'Replace with your official qualifications and awards.',
        badges: {
          0: 'Innovative SME',
          1: 'Tech SME',
          2: 'National high-tech enterprise (planned)',
          3: 'Key software enterprise (planned)',
        },
      },
      partners: {
        title: 'Partners',
        description: 'We collaborate with content teams, overseas brands, studios, and platforms.',
        items: {
          0: 'Overseas drama teams',
          1: 'E-commerce brands',
          2: 'Agencies & studios',
          3: 'Game publishing & ops',
          4: 'Creator networks',
          5: 'Universities & labs',
        },
      },
    },
    meta: {
      title: '{siteName} - AI music generation, create instantly',
      description:
        '{siteName}: An AI music generation landing page demo showcasing text-to-music, style control, export, and post-editing.',
      keywords: 'AI music,AI music generator,text to music,music generation,soundtrack,BGM',
      ogTitle: '{siteName} - AI music generation',
      twitterTitle: '{siteName} - AI music generation',
      schemaName: '{siteName} - AI music generation',
    },
    features: {
      items: {
        textToMusic: {
          title: 'Text-to-music generation',
          description: 'Generate melodies, harmonies, and arrangements from prompts and scene descriptions.',
        },
        styleControl: {
          title: 'Style & parameter control',
          description: 'Control style, mood, tempo (BPM), duration, and more for guided generation.',
        },
        multiVersion: {
          title: 'Multi-version iteration',
          description: 'Generate multiple candidates in one click to compare directions and refine fast.',
        },
        highQuality: {
          title: 'High-quality audio output',
          description: 'Create audio assets ready for content soundtracks, with common export formats.',
        },
        stems: {
          title: 'Stems export & post-editing',
          description: 'Export stems and finish mixing, mastering, and polishing in your DAW.',
        },
        licensing: {
          title: 'Licensing & usage guidance',
          description: 'Provide licensing options and best practices so you can publish with confidence.',
        },
      },
    },
    workflow: {
      steps: {
        describe: {
          title: 'Describe the music you want',
          description: 'In one sentence: style, mood, scene, and references (Chinese prompts supported).',
        },
        generate: {
          title: 'Pick parameters & generate',
          description: 'Set duration and tempo, generate multiple candidates, and preview to pick quickly.',
        },
        export: {
          title: 'Export and keep producing',
          description: 'Export audio or stems and continue arranging, mixing, and publishing in your workflow.',
        },
      },
    },
    scenarios: {
      items: {
        shortVideo: {
          title: 'Short videos / livestreams',
          description: 'Produce multiple BGMs quickly to match moods and transitions.',
        },
        game: {
          title: 'Games & interactive content',
          description: 'Draft ambient music for levels and scenes—ideas and usable assets.',
        },
        ads: {
          title: 'Ads & brand films',
          description: 'Try different style directions faster and improve proposal efficiency.',
        },
        podcast: {
          title: 'Podcasts / intro & outro',
          description: 'Generate brand-consistent intros, outros, and stingers for a cohesive sound.',
        },
        library: {
          title: 'Creator music library',
          description: 'Build reusable style templates and snippets and iterate over time.',
        },
        delivery: {
          title: 'Export & delivery',
          description: 'One-click export for smoother collaboration with editing, production, and clients.',
        },
      },
    },
    faq: {
      items: {
        commercial: {
          q: 'Can I use generated music commercially?',
          a: 'Commercial usage depends on the license plan and terms you choose. Review licensing before publishing and keep export/order records for reference.',
        },
        exportFormats: {
          q: 'Which export formats are supported?',
          a: 'Commonly WAV/MP3 are provided, and some versions support stems export for further work in a DAW.',
        },
        controlParams: {
          q: 'Can I control style, BPM, and duration?',
          a: 'Yes. Use prompts and parameters to control style, mood, tempo (BPM), and duration, then iterate quickly with multi-version generation.',
        },
        chinesePrompt: {
          q: 'Do you support Chinese prompts?',
          a: 'Yes. Describe scenes and keywords in Chinese, and you can mix English style terms for more precise direction.',
        },
      },
    },
  },
} as const

export type Locale = keyof typeof messages
