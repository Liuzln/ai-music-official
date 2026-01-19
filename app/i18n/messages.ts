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
      features: '软件功能',
      workflow: '工作流程',
      scenarios: '适用场景',
      faq: 'FAQ',
    },
    actions: {
      tryNow: '立即体验',
      viewFeatures: '查看功能',
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
        features: '功能',
        workflow: '流程',
        faq: 'FAQ',
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
      features: 'Features',
      workflow: 'Workflow',
      scenarios: 'Use cases',
      faq: 'FAQ',
    },
    actions: {
      tryNow: 'Try now',
      viewFeatures: 'View features',
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
        features: 'Features',
        workflow: 'Workflow',
        faq: 'FAQ',
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
