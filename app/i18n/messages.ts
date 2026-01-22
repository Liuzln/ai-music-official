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
      tag: '统一音频生成引擎 · AudioX',
      title: '新一代全能音频大脑',
      subtitle:
        '{siteName} 基于海量高标数据训练的统一音频生成引擎 AudioX：在一个会话内完成语音复刻、预制声线与多场景音频生成，并提供低延迟 API。',
      badges: {
        textToMusic: '高保真语音复刻',
        styleControl: '一句话语音复刻',
        stemsExport: '高品质预制声线',
        multiVersion: '流式接口 <500ms',
      },
      disclaimer: '* 效果受录音环境与素材影响，交付周期与授权以实际协议为准。',
    },
    preview: {
      title: '试试看！',
      prompt: '输入：欢迎来到我的直播间…（品牌美妆带货）',
      style: '场景',
      duration: '情绪',
      export: '格式',
      listen: '试听',
      pause: '暂停',
      waveform: '音频波形',
      demo: '示意 UI',
      values: {
        scene: 'AI 直播带货',
        emotion: '热情 / 亲和',
        format: 'WAV / MP3',
      },
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
        description:
          '我们专注于 AudioX 统一音频生成引擎与 IndexX Agent 平台：从高保真语音复刻、一句话克隆到预制声线与数字 IP 互动，让声音生产更高效、更可控、更安全。',
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
        noQr: '暂无二维码',
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
      nav: {
        ariaLabel: '关于页面导航',
        intro: '介绍',
        awardsPartners: '荣誉与合作',
      },
      contact: {
        title: '联系我们',
      },
      cases: {
        title: '能力与场景',
        description: '高保真语音复刻、一句话语音克隆与预制声线等能力，可按业务场景组合落地。',
        items: {
          shortDrama: {
            title: '高保真语音复刻',
            description:
              '与真人无异的语音复刻，准确还原口音、语气、情感，适用于数字人、新闻播报、视频/短视频、客服、游戏语音、有声书、智能硬件等。',
            note: '仅需 5 分钟手机录音即可制作，3 个工作日内交付；多重身份核验与全流程加密，模型独立分发。',
            metrics: {
              0: { label: '录音时长', value: '≈ 5 分钟' },
              1: { label: '交付周期', value: '3 个工作日' },
            },
          },
          ads: {
            title: '一句话语音复刻',
            description: '只需 1 秒参考语音即可完成克隆，小成本快制作，适合概念验证与快速尝试多种声线。',
            note: '秒级语音克隆速率，无需漫长等待，帮助项目即时完成概念验证。',
            metrics: {
              0: { label: '参考语音', value: '1 秒' },
              1: { label: '生成速率', value: '秒级' },
            },
          },
          ecommerce: {
            title: '高品质预制声线',
            description: '丰富的预制声线覆盖直播、视频广告、有声书、数字人文娱、智能硬件、语音教学等场景，满足不同需求。',
            note: '丰富的控制参数可精准控制语速、情感、语调；支持流式接口，响应时间小于 500ms。',
            metrics: {
              0: { label: '响应延迟', value: '< 500ms' },
              1: { label: '覆盖语言', value: '多语种' },
            },
          },
        },
      },
      awards: {
        title: '比赛与获奖',
        description: '后续可替换为实拍图片/证书，支持珊格（栅格）展示。',
        placeholder: '待添加图片',
        noImage: '暂无图片',
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
        description: '面向数字人、内容制作、客服/游戏与智能硬件等团队合作共创。',
        items: {
          0: '数字人 / 虚拟人团队',
          1: '视频 / 短视频制作团队',
          2: '客服 / 呼叫中心',
          3: '游戏与互动娱乐',
          4: '有声书 / 内容平台',
          5: '智能硬件与 IoT',
        },
      },
    },
    meta: {
      title: '{siteName} - AudioX 统一音频生成引擎',
      description:
        '{siteName}：基于海量高标数据训练的统一音频生成引擎 AudioX，提供高保真语音复刻、一句话语音克隆、高品质预制声线与低延迟 API。',
      keywords: 'AudioX,音频大模型,音频生成,语音复刻,声音克隆,一句话克隆,TTS,预制声线,数字人,低延迟API',
      ogTitle: '{siteName} - AudioX 音频大模型',
      twitterTitle: '{siteName} - AudioX 音频大模型',
      schemaName: '{siteName} - AudioX 音频大模型',
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
      tag: 'Unified audio generation · AudioX',
      title: 'The next-gen all-in-one audio brain',
      subtitle:
        '{siteName} runs on AudioX, a unified audio generation engine trained on high-quality data—covering high-fidelity voice cloning, 1-second instant cloning, prebuilt voices, and low-latency APIs.',
      badges: {
        textToMusic: 'High-fidelity cloning',
        styleControl: '1-second cloning',
        stemsExport: 'Prebuilt voices',
        multiVersion: 'Streaming API <500ms',
      },
      disclaimer: '* Results depend on your recordings. Delivery timelines and licensing follow the actual agreement.',
    },
    preview: {
      title: 'Try it',
      prompt: 'Input: Welcome to my livestream… (beauty products)',
      style: 'Scene',
      duration: 'Emotion',
      export: 'Format',
      listen: 'Listen',
      pause: 'Pause',
      waveform: 'Waveform',
      demo: 'Demo UI',
      values: {
        scene: 'Livestream sales',
        emotion: 'Energetic / Friendly',
        format: 'WAV / MP3',
      },
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
        description:
          'We build AudioX and the IndexX Agent platform—from high-fidelity voice cloning and 1-second cloning to prebuilt voices and interactive voice IP, making voice production faster, more controllable, and more secure.',
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
        noQr: 'No QR',
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
      nav: {
        ariaLabel: 'About page navigation',
        intro: 'Intro',
        awardsPartners: 'Awards & partners',
      },
      contact: {
        title: 'GET IN TOUCH',
      },
      cases: {
        title: 'Capabilities & use cases',
        description: 'Combine high-fidelity cloning, instant cloning, and prebuilt voices to match your business scenario.',
        items: {
          shortDrama: {
            title: 'High-fidelity voice cloning',
            description:
              'Near-human voice replicas with accent, tone, and emotion—built for digital humans, broadcasting, short videos, customer service, games, audiobooks, and smart devices.',
            note: 'Made from ~5 minutes of mobile recording, delivered in 3 business days; identity checks and end-to-end encryption with isolated model delivery.',
            metrics: {
              0: { label: 'Recording time', value: '~5 min' },
              1: { label: 'Delivery', value: '3 business days' },
            },
          },
          ads: {
            title: '1-second voice cloning',
            description: 'Clone from a 1-second reference—low-cost, fast to iterate, great for prototyping and exploring multiple voices.',
            note: 'Instant turnaround at seconds-level speed, without long waits.',
            metrics: {
              0: { label: 'Reference audio', value: '1s' },
              1: { label: 'Speed', value: 'Seconds' },
            },
          },
          ecommerce: {
            title: 'High-quality prebuilt voices',
            description:
              'A rich library of prebuilt voices for livestreaming, ads, audiobooks, entertainment, smart hardware, and voice training.',
            note: 'Fine-grained control over pace, emotion, and pitch; streaming APIs with <500ms response time.',
            metrics: {
              0: { label: 'Latency', value: '<500ms' },
              1: { label: 'Languages', value: 'Multiple' },
            },
          },
        },
      },
      awards: {
        title: 'Competitions & awards',
        description: 'Replace with photos/certificates later. Responsive mosaic grid included.',
        placeholder: 'Add image later',
        noImage: 'No image',
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
        description: 'We collaborate with digital human studios, content teams, customer service, gaming, and smart devices.',
        items: {
          0: 'Digital humans / avatars',
          1: 'Video & short-form content',
          2: 'Customer service & call centers',
          3: 'Games & interactive entertainment',
          4: 'Audiobooks & content platforms',
          5: 'Smart devices & IoT',
        },
      },
    },
    meta: {
      title: '{siteName} - AudioX unified audio generation',
      description:
        '{siteName}: AudioX is a unified audio generation engine trained on high-quality data—offering high-fidelity voice cloning, 1-second instant cloning, prebuilt voices, and low-latency APIs.',
      keywords: 'AudioX,audio generation,audio foundation model,voice cloning,TTS,prebuilt voices,digital human,low-latency API',
      ogTitle: '{siteName} - AudioX audio foundation model',
      twitterTitle: '{siteName} - AudioX audio foundation model',
      schemaName: '{siteName} - AudioX audio foundation model',
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
