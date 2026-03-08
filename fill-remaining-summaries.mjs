import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabase = createClient(
  'https://ulxzyjqmvzyqjynmqywe.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseHp5anFtdnp5cWp5bm1xeXdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjI5NzI3NiwiZXhwIjoyMDg3ODczMjc2fQ.LlF5YqF9HAfmnYJiOrgthA1vsF_sx3f9gAIs4ckZdyM'
);

// Additional hardcoded summaries for remaining books
const additionalSummaries = [
  {
    title: "Blue Ocean Strategy",
    author: "W. Chan Kim",
    short_summary: "Create uncontested market space by making competition irrelevant through value innovation and strategic canvas reconstruction.",
    long_summary: "W. Chan Kim and Renée Mauborgne present a framework for creating new market space rather than competing in existing markets. The book introduces blue ocean strategy—creating and capturing new demand while making the competition irrelevant. The authors present tools like the Strategy Canvas, Four Actions Framework, and Six Paths Framework for reconstructing market boundaries and creating value innovation.",
    key_insights: [
      "Create new market space",
      "Make competition irrelevant",
      "Value innovation creates demand",
      "Eliminate-reduce-raise-create framework",
      "Strategy canvas maps competition",
      "Blue oceans sustain profits",
      "Reconstruct market boundaries"
    ]
  },
  {
    title: "Scaling Up",
    author: "Verne Harnish",
    short_summary: "Growth framework for scaling businesses through people, strategy, execution, and cash management systems.",
    long_summary: "Verne Harnish provides a comprehensive framework for growing and scaling businesses effectively. The book presents four key decisions: People, Strategy, Execution, and Cash. Harnish offers practical tools like the One-Page Strategic Plan, the Rockefeller Habits, and the Cash Conversion Cycle. The approach helps entrepreneurs build scalable organizations that can maintain growth while maintaining operational excellence.",
    key_insights: [
      "Four decisions drive growth",
      "One-page plan aligns everyone",
      "Rockefeller habits create rhythm",
      "Cash conversion cycle matters",
      "People decisions precede strategy",
      "Execution requires metrics",
      "Scalable systems enable growth"
    ]
  },
  {
    title: "The Hard Thing About Hard Things",
    author: "Ben Horowitz",
    short_summary: "Practical advice for navigating the difficult decisions and challenges that no business school prepares entrepreneurs for.",
    long_summary: "Ben Horowitz shares hard-won lessons from building and selling technology companies. The book tackles the tough situations entrepreneurs face: firing friends, managing crises, and making decisions without clear answers. Horowitz provides practical advice on leadership, strategy, and company culture when things go wrong. The approach combines war stories, management theory, and actionable guidance.",
    key_insights: [
      "Leadership requires tough decisions",
      "Crisis management tests character",
      "Culture survives downturns",
      "Honesty builds trust",
      "War stories teach lessons",
      "No easy answers exist",
      "Struggle builds strength"
    ]
  },
  {
    title: "Extreme Ownership",
    author: "Jocko Willink",
    short_summary: "Navy SEAL leadership principles for taking complete responsibility and leading teams to victory in any situation.",
    long_summary: "Jocko Willink and Leif Babin translate Navy SEAL combat leadership lessons to business and life. The book teaches extreme ownership—taking complete responsibility for everything in your world. The authors present principles like no bad teams, only bad leaders; cover and move; and decentralized command. The approach combines combat stories with practical leadership applications.",
    key_insights: [
      "Own everything in your world",
      "No bad teams, only bad leaders",
      "Cover and move enables success",
      "Decentralized command empowers",
      "Discipline equals freedom",
      "Prioritize and execute",
      "Leadership solves problems"
    ]
  },
  {
    title: "Leaders Eat Last",
    author: "Simon Sinek",
    short_summary: "Great leaders create environments of trust and cooperation where people feel safe and work together for common good.",
    long_summary: "Simon Sinek explores why some leaders inspire trust and cooperation while others don't. The book examines how great leaders create Circle of Safety environments where people feel protected and valued. Sinek explains the biological basis of leadership and cooperation, showing how serotonin and oxytocin create bonds of trust. The approach combines neuroscience, anthropology, and business examples.",
    key_insights: [
      "Leaders create Circle of Safety",
      "Trust enables cooperation",
      "Serotonin builds social bonds",
      "Oxytocin creates connection",
      "Self-interest destroys teams",
      "Leaders sacrifice for others",
      "Environment shapes behavior"
    ]
  },
  {
    title: "Getting Things Done",
    author: "David Allen",
    short_summary: "Productivity system for capturing, organizing, and completing all commitments to achieve stress-free productivity.",
    long_summary: "David Allen presents the GTD methodology for achieving stress-free productivity. The book teaches how to capture all commitments, process inputs into actionable items, organize by context, and review regularly. Allen explains how externalizing tasks frees mental space and creates clarity. The approach combines practical workflow management with psychological principles for reduced stress.",
    key_insights: [
      "Capture everything externally",
      "Process inputs systematically",
      "Organize by context",
      "Review weekly for clarity",
      "Two-minute rule handles tasks",
      "Next actions define progress",
      "Mental clarity requires externalization"
    ]
  },
  {
    title: "The ONE Thing",
    author: "Gary Keller",
    short_summary: "Extraordinary results come from focusing on the one most important thing and making it your priority.",
    long_summary: "Gary Keller argues that extraordinary results come from doing the right one thing, not doing many things. The book presents the focusing question: What's the ONE Thing I can do such that by doing it, everything else will be easier or unnecessary? Keller explains how success builds sequentially through domino effects and why multitasking reduces effectiveness.",
    key_insights: [
      "Focus on one thing",
      "Domino effect creates momentum",
      "Multitasking reduces effectiveness",
      "Success builds sequentially",
      "Big goals require small actions",
      "Time blocking creates focus",
      "Extraordinary needs extraordinary focus"
    ]
  },
  {
    title: "Indistractable",
    author: "Nir Eyal",
    short_summary: "Become indistractable by understanding the psychology of distraction and building systems for deep focus.",
    long_summary: "Nir Eyal presents a framework for becoming indistractable in an age of constant distraction. The book explores the psychological drivers of distraction and presents four strategies for focus: master internal triggers, make time for traction, hack back external triggers, and prevent distraction with pacts. Eyal shows how to manage technology rather than letting it manage you.",
    key_insights: [
      "Distraction comes from within",
      "Traction requires planning",
      "External triggers can be managed",
      "Pacts prevent distraction",
      "Values guide priorities",
      "Technology management is key",
      "Focus is a learnable skill"
    ]
  },
  {
    title: "The Gifts of Imperfection",
    author: "Brené Brown",
    short_summary: "Embracing imperfection and vulnerability leads to authentic living and wholehearted existence.",
    long_summary: "Brené Brown explores how embracing imperfection and vulnerability transforms our lives. The book presents guideposts for wholehearted living: courage, compassion, connection, and authenticity. Brown shows how letting go of who we think we're supposed to be allows us to become who we are. The approach combines research, personal stories, and practical wisdom.",
    key_insights: [
      "Imperfection creates authenticity",
      "Vulnerability requires courage",
      "Shame prevents wholeness",
      "Compassion heals wounds",
      "Connection requires authenticity",
      "Letting go creates freedom",
      "Wholehearted living embraces imperfection"
    ]
  },
  {
    title: "Untamed",
    author: "Glennon Doyle",
    short_summary: "Stop pleasing others and start living authentically by trusting your inner voice and breaking free from expectations.",
    long_summary: "Glennon Doyle shares her journey of breaking free from societal expectations and living authentically. The book teaches women to trust their inner knowing, stop being good, and become who they were meant to be. Doyle explores themes of motherhood, marriage, and self-discovery through personal stories and poetic insights. The approach combines memoir with self-help guidance.",
    key_insights: [
      "Trust your inner knowing",
      "Stop being good, become real",
      "Discomfort signals growth",
      "Authenticity requires courage",
      "Break free from expectations",
      "Self-trust guides decisions",
      "Freedom requires rebellion"
    ]
  },
  {
    title: "Educated",
    author: "Tara Westover",
    short_summary: "Memoir of a woman who escapes a survivalist family to pursue education, discovering the transformative power of knowledge.",
    long_summary: "Tara Westover's memoir chronicles her journey from growing up in a survivalist Mormon family in rural Idaho to earning a PhD from Cambridge. The book explores themes of family loyalty, education as liberation, and the conflict between identity and origin. Westover shows how education transformed her worldview while creating painful distance from her family.",
    key_insights: [
      "Education transforms identity",
      "Knowledge creates freedom",
      "Family loyalty conflicts with growth",
      "Self-education requires courage",
      "Memory shapes reality",
      "Education bridges worlds",
      "Growth requires leaving home"
    ]
  },
  {
    title: "Becoming",
    author: "Michelle Obama",
    short_summary: "Memoir of Michelle Obama's journey from Chicago's South Side to becoming First Lady and finding her voice.",
    long_summary: "Michelle Obama's memoir traces her journey from the South Side of Chicago to the White House. The book explores her childhood, education, career, and role as First Lady. Obama shares personal stories about finding her voice, balancing career and family, and navigating public life. The memoir reveals the humanity behind the public figure.",
    key_insights: [
      "Voice develops through experience",
      "Roots provide strength",
      "Balance requires constant adjustment",
      "Public service is privilege",
      "Family shapes identity",
      "Education opens doors",
      "Authenticity resonates"
    ]
  },
  {
    title: "You Are a Badass",
    author: "Jen Sincero",
    short_summary: "Stop doubting your greatness and start living an awesome life by changing your mindset and taking action.",
    long_summary: "Jen Sincero presents a humorous guide to self-improvement and personal transformation. The book teaches how to identify and change self-sabotaging beliefs, embrace your inner badass, and create the life you want. Sincero combines personal stories, practical exercises, and motivational advice to help readers overcome fear and live boldly.",
    key_insights: [
      "Beliefs create reality",
      "Fear blocks greatness",
      "Self-love enables success",
      "Action creates confidence",
      "Thoughts shape outcomes",
      "Vulnerability builds strength",
      "You are already enough"
    ]
  },
  {
    title: "The Magic of Thinking Big",
    author: "David Schwartz",
    short_summary: "Success comes from thinking big, believing in yourself, and taking action on your dreams and goals.",
    long_summary: "David Schwartz presents practical strategies for achieving success by thinking big. The book teaches how to develop confidence, overcome fear, build positive relationships, and take decisive action. Schwartz shows how success comes from believing in yourself and your ability to achieve. The approach combines motivation with practical guidance.",
    key_insights: [
      "Thinking big creates big results",
      "Belief determines capability",
      "Confidence builds through action",
      "Fear limits potential",
      "Positive thinking attracts success",
      "Action creates opportunity",
      "Environment shapes mindset"
    ]
  },
  {
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    short_summary: "Thirteen steps to riches based on studying successful people, emphasizing desire, faith, and persistence.",
    long_summary: "Napoleon Hill presents thirteen principles for achieving wealth and success based on studying Andrew Carnegie and other successful people. The book emphasizes desire, faith, specialized knowledge, imagination, organized planning, decision, persistence, and the power of the mastermind. Hill shows how thoughts become things through focused desire and persistent action.",
    key_insights: [
      "Desire is the starting point",
      "Faith transforms desire into reality",
      "Persistence overcomes defeat",
      "Mastermind creates power",
      "Thoughts become things",
      "Decision requires definiteness",
      "Imagination creates wealth"
    ]
  },
  {
    title: "The Little Book of Common Sense Investing",
    author: "John Bogle",
    short_summary: "Simple investment strategy: own all stocks through low-cost index funds and hold them for the long term.",
    long_summary: "John Bogle presents a simple, effective investment strategy for ordinary investors. The book advocates owning all stocks through low-cost index funds and holding them long-term. Bogle explains why trying to beat the market is futile and how costs destroy returns. The approach combines statistical evidence with practical wisdom for long-term wealth building.",
    key_insights: [
      "Index funds beat active management",
      "Costs destroy returns",
      "Time in market beats timing",
      "Diversification reduces risk",
      "Simplicity outperforms complexity",
      "Long-term thinking wins",
      "Discipline creates wealth"
    ]
  },
  {
    title: "A Random Walk Down Wall Street",
    author: "Burton Malkiel",
    short_summary: "Markets are efficient and unpredictable; the best strategy is diversified, low-cost index fund investing.",
    long_summary: "Burton Malkiel presents evidence that stock markets are efficient and unpredictable, making it impossible to consistently beat the market. The book advocates for diversified, low-cost index fund investing. Malkiel covers investment theory, market history, and practical strategies for ordinary investors. The approach combines academic research with accessible guidance.",
    key_insights: [
      "Markets are efficient",
      "Random walks dominate prices",
      "Index funds outperform actively",
      "Diversification reduces risk",
      "Costs matter greatly",
      "Time beats timing",
      "Simplicity wins"
    ]
  },
  {
    title: "I Will Teach You to Be Rich",
    author: "Ramit Sethi",
    short_summary: "Six-week program for automating finances, optimizing spending, and building wealth without deprivation.",
    long_summary: "Ramit Sethi presents a six-week program for financial automation and optimization. The book teaches conscious spending, automated savings, strategic investing, and credit card optimization. Sethi shows how to build wealth while enjoying life. The approach combines behavioral psychology with practical financial systems for young professionals.",
    key_insights: [
      "Automate everything financial",
      "Spend consciously on what matters",
      "Credit cards optimize rewards",
      "Investing starts early",
      "Negotiation saves thousands",
      "Systems beat willpower",
      "Rich life costs less than imagined"
    ]
  },
  {
    title: "The Simple Path to Wealth",
    author: "JL Collins",
    short_summary: "Simple path to financial independence through aggressive saving, index fund investing, and avoiding debt.",
    long_summary: "JL Collins presents a straightforward path to financial independence. The book advocates aggressive saving, investing in broad-based index funds, and avoiding debt. Collins explains why simplicity beats complexity in investing and how to achieve wealth through basic principles. The approach combines no-nonsense advice with encouraging wisdom.",
    key_insights: [
      "Save aggressively and consistently",
      "Index funds provide simplicity",
      "Debt destroys wealth",
      "Time compounds dramatically",
      "Complexity reduces returns",
      "Discipline beats intelligence",
      "Independence requires sacrifice"
    ]
  },
  {
    title: "Your Money or Your Life",
    author: "Vicki Robin",
    short_summary: "Transform your relationship with money by understanding its life energy cost and achieving financial independence.",
    long_summary: "Vicki Robin presents a transformative approach to money management and financial independence. The book teaches how to calculate the real cost of spending in life energy, track expenses mindfully, and align spending with values. Robin shows how achieving financial independence creates freedom and fulfillment. The approach combines practical steps with philosophical insights.",
    key_insights: [
      "Money equals life energy",
      "Spending reflects values",
      "Financial independence creates freedom",
      "Mindful spending transforms life",
      "Enough is better than more",
      "Fulfillment beats consumption",
      "Time is the real wealth"
    ]
  },
  {
    title: "The Millionaire Next Door",
    author: "Thomas Stanley",
    short_summary: "Most millionaires live frugally, save consistently, and build wealth gradually through disciplined habits.",
    long_summary: "Thomas Stanley profiles America's millionaires, revealing they typically live modestly, save diligently, and build wealth slowly. The book contrasts the perception of millionaires with reality—most are first-generation, self-made, and frugal. Stanley shows how disciplined saving, investing, and lifestyle choices create sustainable wealth.",
    key_insights: [
      "Millionaires live frugally",
      "Saving creates wealth",
      "Income doesn't equal wealth",
      "Discipline beats income",
      "Lifestyle inflation destroys wealth",
      "Patience compounds dramatically",
      "Economic independence requires sacrifice"
    ]
  },
  {
    title: "The Total Money Makeover",
    author: "Dave Ramsey",
    short_summary: "Seven-step plan to get out of debt, build wealth, and achieve financial peace through disciplined money management.",
    long_summary: "Dave Ramsey presents a seven-step plan for financial transformation: emergency fund, debt snowball, full emergency fund, invest 15%, pay off home early, build wealth, and give generously. Ramsey emphasizes debt-free living, emergency preparedness, and generous giving. The approach combines behavioral psychology with practical financial steps.",
    key_insights: [
      "Debt creates financial slavery",
      "Emergency funds provide security",
      "Debt snowball builds momentum",
      "Investing 15% creates wealth",
      "Giving creates fulfillment",
      "Financial peace requires discipline",
      "Baby steps create progress"
    ]
  },
  {
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    short_summary: "Exploration of the universe's origins, from the Big Bang to black holes, making complex physics accessible.",
    long_summary: "Stephen Hawking presents the universe's story from the Big Bang to black holes in accessible language. The book explores space and time, the expanding universe, quantum mechanics, and the nature of God. Hawking explains complex physics concepts like relativity and quantum theory for general readers. The work remains a landmark in popular science writing.",
    key_insights: [
      "Universe began with Big Bang",
      "Time and space are relative",
      "Black holes bend reality",
      "Quantum mechanics governs small scale",
      "Universe continues expanding",
      "Science explains origins",
      "Mystery remains at boundaries"
    ]
  },
  {
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    short_summary: "Evolution operates at the gene level, with organisms as survival machines for selfish genes.",
    long_summary: "Richard Dawkins presents gene-centered evolution, arguing that genes are the fundamental units of natural selection. The book explains how organisms serve as survival machines for selfish genes. Dawkins introduces concepts like memes, reciprocal altruism, and evolutionary stable strategies. The work revolutionized understanding of evolution and behavior.",
    key_insights: [
      "Genes drive evolution",
      "Organisms are gene machines",
      "Altruism can be selfish",
      "Memes evolve culturally",
      "Competition shapes cooperation",
      "Genes survive through reproduction",
      "Evolution lacks purpose"
    ]
  },
  {
    title: "Cosmos",
    author: "Carl Sagan",
    short_summary: "Journey through the universe exploring cosmic evolution, life on Earth, and humanity's place in the cosmos.",
    long_summary: "Carl Sagan takes readers on a journey through space and time, exploring cosmic evolution, the origins of life, and humanity's place in the universe. The book combines astronomy, biology, and philosophy to create a cosmic perspective. Sagan's poetic writing makes complex science accessible while inspiring wonder about our place in the cosmos.",
    key_insights: [
      "Universe is vast and ancient",
      "Life is rare and precious",
      "Science reveals cosmic perspective",
      "Humanity is cosmic consciousness",
      "Evolution connects all life",
      "Knowledge requires humility",
      "Future depends on wisdom"
    ]
  },
  {
    title: "The Origin of Species",
    author: "Charles Darwin",
    short_summary: "Theory of evolution by natural selection explaining how species adapt and evolve over time.",
    long_summary: "Charles Darwin presents revolutionary evidence for evolution by natural selection. The book explains how variation, inheritance, and differential survival lead to species adaptation and evolution. Darwin provides extensive evidence from domestic breeding, geography, and natural history. The work fundamentally changed biology and our understanding of life.",
    key_insights: [
      "Natural selection drives evolution",
      "Variation provides raw material",
      "Competition shapes adaptation",
      "Common ancestry connects species",
      "Gradual change creates complexity",
      "Environment selects traits",
      "Evolution lacks direction"
    ]
  },
  {
    title: "A Short History of Nearly Everything",
    author: "Bill Bryson",
    short_summary: "Entertaining journey through scientific discoveries about the universe, Earth, life, and human existence.",
    long_summary: "Bill Bryson presents an entertaining and accessible tour of scientific knowledge about everything from the Big Bang to human civilization. The book explores physics, chemistry, biology, geology, and anthropology through fascinating stories of discovery and the remarkable scientists behind them. Bryson makes complex science understandable and engaging.",
    key_insights: [
      "Science reveals amazing stories",
      "Discovery requires persistence",
      "Universe is improbable and wonderful",
      "Life adapts miraculously",
      "Knowledge builds incrementally",
      "Scientists are fascinating characters",
      "Mystery remains at every level"
    ]
  },
  {
    title: "The Elegant Universe",
    author: "Brian Greene",
    short_summary: "String theory attempts to unite general relativity and quantum mechanics in a theory of everything.",
    long_summary: "Brian Greene presents string theory as a potential unified theory of fundamental physics. The book explains how tiny vibrating strings could create all particles and forces, unifying relativity and quantum mechanics. Greene makes complex concepts like extra dimensions and quantum geometry accessible through analogies and clear explanations.",
    key_insights: [
      "Strings may be fundamental reality",
      "Extra dimensions could exist",
      "Relativity and quantum conflict",
      "Unification drives physics",
      "Mathematics describes reality",
      "Beauty guides theory",
      "Mystery remains profound"
    ]
  },
  {
    title: "The Gene",
    author: "Siddhartha Mukherjee",
    short_summary: "History of genetics from Mendel to modern gene therapy, exploring how genes shape identity and destiny.",
    long_summary: "Siddhartha Mukherjee presents the history of genetics as a biography of the gene. The book traces discoveries from Mendel through DNA structure to modern gene therapy. Mukherjee explores how genes influence identity, disease, and destiny while examining ethical questions about genetic manipulation. The work combines science history with personal narrative.",
    key_insights: [
      "Genes program biology",
      "Heredity transmits information",
      "Environment influences expression",
      "Genetic manipulation raises ethics",
      "Identity has biological basis",
      "Science progresses gradually",
      "Knowledge brings responsibility"
    ]
  },
  {
    title: "The Body",
    author: "Bill Bryson",
    short_summary: "Fascinating journey through human anatomy and physiology, exploring how the body works and medical discoveries.",
    long_summary: "Bill Bryson takes readers on a tour of the human body, exploring anatomy, physiology, and medical history. The book examines each body system and the scientists who discovered how they work. Bryson combines fascinating facts, historical stories, and personal health insights to create an engaging guide to being human.",
    key_insights: [
      "Body is incredibly complex",
      "Medical discovery saves lives",
      "Science reveals body mysteries",
      "Health requires balance",
      "Disease reveals function",
      "Evolution shapes design",
      "Knowledge improves health"
    ]
  },
  {
    title: "Astrophysics for People in a Hurry",
    author: "Neil deGrasse Tyson",
    short_summary: "Quick tour of the universe's biggest concepts, from the Big Bang to black holes, for busy readers.",
    long_summary: "Neil deGrasse Tyson presents astrophysics essentials for readers with limited time. The book covers the Big Bang, dark matter, dark energy, black holes, and the search for extraterrestrial life. Tyson makes complex cosmic concepts accessible through clear explanations and engaging examples. The work brings the universe to busy readers.",
    key_insights: [
      "Universe expands mysteriously",
      "Dark matter dominates mass",
      "Dark energy drives expansion",
      "Black holes warp spacetime",
      "Life may be common but rare",
      "Cosmos inspires wonder",
      "Science answers cosmic questions"
    ]
  },
  {
    title: "Existentialism is a Humanism",
    author: "Jean-Paul Sartre",
    short_summary: "Existentialism philosophy asserting that existence precedes essence and humans create their own meaning.",
    long_summary: "Jean-Paul Sartre presents existentialism as a philosophy of human freedom and responsibility. The book argues that existence precedes essence—humans exist first, then define themselves through choices. Sartre explains how radical freedom creates both anguish and opportunity for authentic living. The work makes complex philosophy accessible.",
    key_insights: [
      "Existence precedes essence",
      "Freedom creates responsibility",
      "Humans define themselves",
      "Anguish accompanies freedom",
      "Bad faith denies freedom",
      "Authenticity requires honesty",
      "Choice creates meaning"
    ]
  },
  {
    title: "The Consolations of Philosophy",
    author: "Alain de Botton",
    short_summary: "Philosophy provides practical wisdom for everyday problems like unpopularity, poverty, and broken hearts.",
    long_summary: "Alain de Botton shows how philosophy offers practical solutions to life's problems. The book examines six philosophers—Socrates, Epicurus, Seneca, Montaigne, Schopenhauer, and Nietzsche—and how their ideas provide consolation for unpopularity, poverty, frustration, inadequacy, heartbreak, and difficulties. Philosophy becomes practical life guidance.",
    key_insights: [
      "Philosophy solves life problems",
      "Socrates provides unpopularity consolation",
      "Epicurus addresses poverty",
      "Seneca comforts frustration",
      "Montaigne handles inadequacy",
      "Schopenhauer eases heartbreak",
      "Nietzsche embraces difficulties"
    ]
  },
  {
    title: "How to Live",
    author: "Sarah Bakewell",
    short_summary: "Montaigne's life and philosophy explored through twenty questions about how to live well and authentically.",
    long_summary: "Sarah Bakewell explores Michel de Montaigne's life and philosophy through twenty questions about how to live. The book examines Montaigne's essays on topics like death, friendship, education, and self-knowledge. Bakewell shows how Montaigne's Renaissance wisdom remains relevant for modern life challenges and questions.",
    key_insights: [
      "Question everything including yourself",
      "Accept human imperfection",
      "Friendship requires equality",
      "Education should create judgment",
      "Death teaches how to live",
      "Travel expands perspective",
      "Self-knowledge enables wisdom"
    ]
  },
  {
    title: "When Breath Becomes Air",
    author: "Paul Kalanithi",
    short_summary: "Neurosurgeon's memoir of facing terminal cancer, exploring what makes life meaningful in the face of death.",
    long_summary: "Paul Kalanithi's memoir chronicles his journey from neurosurgeon to terminal cancer patient. The book explores questions of meaning, mortality, and what makes life worth living. Kalanithi examines his roles as doctor, patient, husband, and future father while facing death. The work combines medical insight with philosophical reflection.",
    key_insights: [
      "Mortality reveals meaning",
      "Life's value lies in relationships",
      "Death transforms perspective",
      "Suffering deepens understanding",
      "Time becomes precious",
      "Love transcends circumstance",
      "Legacy continues through others"
    ]
  },
  {
    title: "Blink",
    author: "Malcolm Gladwell",
    short_summary: "Rapid cognition and snap judgments can be as accurate as deliberate decisions when properly understood.",
    long_summary: "Malcolm Gladwell explores how we make snap judgments and when to trust them. The book examines thin-slicing—making quick decisions with limited information. Gladwell shows how unconscious thinking can be more accurate than conscious analysis, but also prone to bias. The work combines psychology research with compelling real-world examples.",
    key_insights: [
      "Snap judgments can be accurate",
      "Thin-slicing extracts key information",
      "Unconscious thinking processes data",
      "Bias affects rapid decisions",
      "Experience improves intuition",
      "Context shapes judgment",
      "Practice trains rapid cognition"
    ]
  },
  {
    title: "David and Goliath",
    author: "Malcolm Gladwell",
    short_summary: "Underdogs and misfits often succeed because disadvantages can create unexpected advantages and opportunities.",
    long_summary: "Malcolm Gladwell examines how underdogs and misfits succeed against overwhelming odds. The book explores how disadvantages can create advantages, how difficulties build resilience, and how breaking conventional rules leads to victory. Gladwell shows how apparent weaknesses can become strengths through different thinking and strategies.",
    key_insights: [
      "Disadvantages create advantages",
      "Difficulty builds resilience",
      "Desperation fuels innovation",
      "Breaking rules wins",
      "Different thinking succeeds",
      "Resources don't determine outcome",
      "Courage compensates for weakness"
    ]
  },
  {
    title: "The Five Love Languages",
    author: "Gary Chapman",
    short_summary: "People give and receive love through five primary languages: words, time, gifts, service, and touch.",
    long_summary: "Gary Chapman presents the five love languages—Words of Affirmation, Quality Time, Receiving Gifts, Acts of Service, and Physical Touch. The book explains how understanding your partner's love language transforms relationships. Chapman shows how speaking different love languages creates connection and prevents misunderstandings.",
    key_insights: [
      "Love has five languages",
      "People give and receive differently",
      "Understanding prevents conflict",
      "Speaking right language fills tank",
      "Love languages apply to all relationships",
      "Learning languages takes effort",
      "Love requires conscious choice"
    ]
  },
  {
    title: "The Purpose Driven Life",
    author: "Rick Warren",
    short_summary: "Discover God's purposes for your life through worship, fellowship, discipleship, ministry, and mission.",
    long_summary: "Rick Warren presents a 40-day spiritual journey to discover God's purposes for your life. The book explores five purposes: worship, fellowship, discipleship, ministry, and mission. Warren shows how understanding these purposes brings meaning and fulfillment. The approach combines biblical teaching with practical application.",
    key_insights: [
      "Life has divine purposes",
      "Worship honors God",
      "Fellowship builds community",
      "Discipleship grows faith",
      "Ministry serves others",
      "Mission shares purpose",
      "Eternal perspective guides decisions"
    ]
  },
  {
    title: "Quiet",
    author: "Susan Cain",
    short_summary: "Introverts possess unique strengths and abilities that are undervalued in an extrovert-dominated world.",
    long_summary: "Susan Cain explores the power and potential of introverts in an extrovert-dominated culture. The book examines how introverts think differently, work differently, and lead differently. Cain shows how understanding introvert strengths improves relationships, workplaces, and society. The work combines psychology research with personal stories.",
    key_insights: [
      "Introverts have unique strengths",
      "Solitude enables creativity",
      "Quiet leadership works effectively",
      "Culture undervalues introversion",
      "Balance between types creates success",
      "Self-acceptance empowers introverts",
      "Different thinking styles complement"
    ]
  },
  {
    title: "Predictably Irrational",
    author: "Dan Ariely",
    short_summary: "Human behavior is systematically irrational in predictable ways due to hidden psychological forces.",
    long_summary: "Dan Ariely explores the hidden forces that systematically drive irrational human behavior. The book examines how emotions, social norms, and expectations influence decisions. Ariely shows through experiments how we predictably make irrational choices about money, relationships, and ethics. The work reveals the psychology behind decision-making.",
    key_insights: [
      "Humans are predictably irrational",
      "Emotions drive decisions",
      "Social norms influence behavior",
      "Expectations shape experience",
      "Free is more powerful than cheap",
      "Relativity affects choices",
      "Understanding reduces irrationality"
    ]
  },
  {
    title: "Influence",
    author: "Robert Cialdini",
    short_summary: "Six universal principles of persuasion: reciprocity, commitment, social proof, authority, liking, and scarcity.",
    long_summary: "Robert Cialdini presents six universal principles of influence: reciprocity, commitment and consistency, social proof, authority, liking, and scarcity. The book explains how these principles trigger automatic compliance responses. Cialdini shows how to recognize and resist undue influence while using principles ethically.",
    key_insights: [
      "Reciprocity creates obligation",
      "Commitment drives consistency",
      "Social proof guides behavior",
      "Authority commands compliance",
      "Liking increases persuasion",
      "Scarcity creates urgency",
      "Influence can be resisted"
    ]
  },
  {
    title: "Stumbling on Happiness",
    author: "Daniel Gilbert",
    short_summary: "Humans are terrible at predicting what will make them happy due to cognitive biases and imagination limitations.",
    long_summary: "Daniel Gilbert explores why humans are so bad at predicting what will make them happy. The book examines cognitive biases, imagination limitations, and memory distortions that affect happiness prediction. Gilbert shows how we stumble on happiness accidentally rather than through planning. The work combines psychology research with engaging examples.",
    key_insights: [
      "Happiness prediction fails systematically",
      "Imagination has limitations",
      "Memory distorts experience",
      "Present bias affects predictions",
      "Social comparison shapes happiness",
      "Control increases satisfaction",
      "Surprise often brings joy"
    ]
  },
  {
    title: "Switch",
    author: "Chip Heath",
    short_summary: "Change follows a pattern: direct the rider, motivate the elephant, and shape the path for successful transformation.",
    long_summary: "Chip and Dan Heath present a framework for successful change based on understanding human psychology. The book uses the metaphor of rider (rational mind), elephant (emotional mind), and path (environment). The authors show how to direct rational thinking, motivate emotional commitment, and shape circumstances for change.",
    key_insights: [
      "Change requires rider and elephant alignment",
      "Rational mind needs direction",
      "Emotional mind needs motivation",
      "Environment shapes behavior",
      "Small changes create momentum",
      "Growth mindset enables change",
      "Bright spots reveal solutions"
    ]
  },
  {
    title: "Nudge",
    author: "Richard Thaler",
    short_summary: "Choice architecture can nudge people toward better decisions while preserving freedom of choice.",
    long_summary: "Richard Thaler and Cass Sunstein present behavioral economics insights for designing better choices. The book explains how small changes in choice architecture—nudges—can improve decisions about health, wealth, and happiness. The authors show how to design environments that help people make better choices while preserving freedom.",
    key_insights: [
      "Choice architecture affects decisions",
      "Defaults influence behavior",
      "Information presentation matters",
      "Nudges preserve freedom",
      "Behavioral economics reveals biases",
      "Small changes create big effects",
      "Libertarian paternalism helps people"
    ]
  },
  {
    title: "The Paradox of Choice",
    author: "Barry Schwartz",
    short_summary: "Having too many options leads to anxiety, indecision, and dissatisfaction rather than freedom.",
    long_summary: "Barry Schwartz explores how abundance of choice in modern society creates anxiety and paralysis rather than freedom. The book examines how too many options lead to decision paralysis, escalation of expectations, and regret. Schwartz shows how limiting choices can increase satisfaction and well-being.",
    key_insights: [
      "Too much choice creates paralysis",
      "Options increase expectations",
      "Regret follows decisions",
      "Satisfaction requires constraints",
      "Maximizers are less happy",
      "Satisficers make better choices",
      "Freedom requires limits"
    ]
  },
  {
    title: "Drive",
    author: "Daniel Pink",
    short_summary: "Intrinsic motivation—autonomy, mastery, and purpose—drives high performance more than external rewards.",
    long_summary: "Daniel Pink presents a new understanding of motivation based on scientific research. The book argues that intrinsic motivation—autonomy, mastery, and purpose—drives performance better than external rewards. Pink shows how traditional carrot-and-stick approaches fail for creative, conceptual work and what truly motivates people.",
    key_insights: [
      "Autonomy drives engagement",
      "Mastery creates fulfillment",
      "Purpose provides meaning",
      "External rewards can backfire",
      "Intrinsic motivation lasts",
      "Creative work needs autonomy",
      "Motivation follows engagement"
    ]
  },
  {
    title: "Big Magic",
    author: "Elizabeth Gilbert",
    short_summary: "Creative living requires embracing curiosity, overcoming fear, and treating ideas as living entities.",
    long_summary: "Elizabeth Gilbert explores creativity as a magical, mysterious process that anyone can access. The book encourages embracing curiosity over passion, working with fear rather than fighting it, and treating ideas as living entities that visit us. Gilbert shows how creative living brings joy and meaning regardless of outcomes.",
    key_insights: [
      "Creativity is for everyone",
      "Curiosity beats passion",
      "Fear accompanies creativity",
      "Ideas are living entities",
      "Process matters more than outcome",
      "Permission creates freedom",
      "Magic requires participation"
    ]
  },
  {
    title: "Rising Strong",
    author: "Brené Brown",
    short_summary: "Process for getting up after falling—reckoning with emotion, exploring stories, and revolutionizing living.",
    long_summary: "Brené Brown presents a process for rising strong after failure and disappointment. The book outlines the reckoning (engaging with emotion), rumble (exploring stories), and revolution (transforming life). Brown shows how getting up after falling builds resilience and wholehearted living. The approach combines research with personal stories.",
    key_insights: [
      "Failure requires reckoning",
      "Stories need examination",
      "Emotion demands engagement",
      "Vulnerability builds strength",
      "Resilience develops through practice",
      "Courage transforms suffering",
      "Rising strong changes life"
    ]
  },
  {
    title: "Braving the Wilderness",
    author: "Brené Brown",
    short_summary: "True belonging requires standing alone in the wilderness—being true to yourself while connecting with others.",
    long_summary: "Brené Brown redefines belonging as being true to yourself while connecting with others. The book explores how to stand alone in your beliefs while still belonging to community. Brown shows how true belonging requires courage, vulnerability, and the willingness to be different. The work combines research with personal insight.",
    key_insights: [
      "Belonging doesn't require conformity",
      "Wilderness represents authenticity",
      "Courage enables true belonging",
      "Connection requires vulnerability",
      "Difference strengthens community",
      "Spirituality guides belonging",
      "Authenticity creates freedom"
    ]
  },
  {
    title: "Dare to Lead",
    author: "Brené Brown",
    short_summary: "Brave leadership requires courage, vulnerability, and values-based action in uncertain environments.",
    long_summary: "Brené Brown presents a framework for brave leadership based on research and experience. The book teaches how to build courage, navigate uncertainty, and lead with values. Brown shows how vulnerability is strength in leadership and how to create cultures of trust and innovation. The approach combines research with practical guidance.",
    key_insights: [
      "Leadership requires courage",
      "Vulnerability builds trust",
      "Values guide decisions",
      "Uncertainty demands bravery",
      "Rumblings precede failure",
      "Clear communication creates alignment",
      "Learning requires courage"
    ]
  },
  {
    title: "The Compound Effect",
    author: "Darren Hardy",
    short_summary: "Small, consistent actions compound over time to create remarkable results in all areas of life.",
    long_summary: "Darren Hardy presents the compound effect principle—small, smart choices + consistency + time = radical success. The book shows how tiny daily decisions compound dramatically over months and years. Hardy explains how to harness this principle for health, relationships, finances, and personal development through consistent habits.",
    key_insights: [
      "Small choices compound dramatically",
      "Consistency creates momentum",
      "Time multiplies results",
      "Habits shape destiny",
      "Daily decisions determine future",
      "Patience enables compounding",
      "Success requires tracking"
    ]
  },
  {
    title: "High Performance Habits",
    author: "Brendon Burchard",
    short_summary: "Six habits practiced by high performers: seeking clarity, generating energy, raising necessity, increasing productivity, developing influence, and demonstrating courage.",
    long_summary: "Brendon Burchard presents six habits consistently practiced by high performers across fields. The book explores seeking clarity, generating energy, raising necessity, increasing productivity, developing influence, and demonstrating courage. Burchard shows how these habits create sustained excellence and fulfillment.",
    key_insights: [
      "Clarity directs action",
      "Energy enables performance",
      "Necessity drives motivation",
      "Productivity maximizes impact",
      "Influence expands reach",
      "Courage overcomes fear",
      "Habits create high performance"
    ]
  },
  {
    title: "Finish",
    author: "Jon Acuff",
    short_summary: "Overcome perfectionism and strategic incompetence to finally finish what you start.",
    long_summary: "Jon Acuff presents research-based strategies for overcoming perfectionism and finishing projects. The book identifies the perfectionist patrol, strategic incompetence, and hidden rules that prevent completion. Acuff shows how to cut goals in half, choose what to bomb, and embrace imperfection to achieve completion. The approach combines humor with practical advice.",
    key_insights: [
      "Perfectionism prevents completion",
      "Strategic incompetence helps focus",
      "Cutting goals enables finishing",
      "Hidden rules sabotage progress",
      "Done beats perfect",
      "Imperfection creates momentum",
      "Completion requires strategy"
    ]
  },
  {
    title: "The 80/20 Principle",
    author: "Richard Koch",
    short_summary: "80% of results come from 20% of causes—identify and focus on the vital few for maximum impact.",
    long_summary: "Richard Koch presents the 80/20 principle—that 80% of results come from 20% of causes. The book shows how to identify and focus on the vital few inputs that generate most outputs. Koch applies this principle to business, personal life, and decision-making for maximum effectiveness with minimum effort.",
    key_insights: [
      "80% of results from 20% of causes",
      "Focus on vital few inputs",
      "Eliminate trivial many activities",
      "Leverage creates disproportionate results",
      "Time follows 80/20 distribution",
      "Quality beats quantity",
      "Simplicity increases effectiveness"
    ]
  },
  {
    title: "The Happiness Project",
    author: "Gretchen Rubin",
    short_summary: "Year-long experiment testing happiness theories and practices to become happier and more fulfilled.",
    long_summary: "Gretchen Rubin chronicles her year-long happiness project, testing wisdom from philosophy, science, and popular culture. The book explores monthly themes like energy, love, work, and mindfulness. Rubin shares what worked, what didn't, and universal principles for increasing happiness through conscious choices and habits.",
    key_insights: [
      "Happiness requires conscious effort",
      "Small changes create big effects",
      "Self-knowledge guides choices",
      "Habits shape daily experience",
      "Relationships increase happiness",
      "Order creates calm",
      "Growth requires reflection"
    ]
  },
  {
    title: "Better Than Before",
    author: "Gretchen Rubin",
    short_summary: "Understanding your personality type helps you build better habits and break bad ones effectively.",
    long_summary: "Gretchen Rubin presents strategies for habit change based on understanding personality tendencies. The book introduces four tendencies—Upholder, Questioner, Obliger, and Rebel—and how each responds to expectations. Rubin shows how to design habit strategies that work with your nature rather than against it.",
    key_insights: [
      "Personality affects habit formation",
      "Four tendencies predict behavior",
      "Strategies must match personality",
      "External vs internal expectations matter",
      "Convenience enables good habits",
      "Accountability supports commitment",
      "Self-knowledge enables change"
    ]
  },
  {
    title: "The Four Tendencies",
    author: "Gretchen Rubin",
    short_summary: "People respond to expectations in four ways: Upholder, Questioner, Obliger, and Rebel—understanding yours improves life.",
    long_summary: "Gretchen Rubin explores how people respond to inner and outer expectations through four tendencies. The book examines Upholders (meet all expectations), Questioners (question outer expectations), Obligers (meet outer expectations), and Rebels (resist all expectations). Rubin shows how understanding your tendency improves relationships and effectiveness.",
    key_insights: [
      "Four tendencies explain behavior",
      "Expectations drive responses",
      "Self-knowledge improves relationships",
      "Different types need different strategies",
      "Outer vs inner expectations matter",
      "Understanding reduces conflict",
      "Work with your nature"
    ]
  },
  {
    title: "Outer Order, Inner Calm",
    author: "Gretchen Rubin",
    short_summary: "Creating outer order—organized spaces and possessions—leads to inner calm and reduced anxiety.",
    long_summary: "Gretchen Rubin explores how creating outer order leads to inner calm and reduced anxiety. The book presents practical strategies for organizing spaces, decluttering possessions, and creating systems that work. Rubin shows how external order creates internal peace and improves decision-making and well-being.",
    key_insights: [
      "Outer order creates inner calm",
      "Clutter increases anxiety",
      "Organization reduces decision fatigue",
      "Systems maintain order",
      "Letting go creates space",
      "Environment affects mood",
      "Order enables clarity"
    ]
  },
  {
    title: "The Life-Changing Magic of Tidying Up",
    author: "Marie Kondo",
    short_summary: "KonMari method of decluttering by keeping only items that spark joy and organizing them systematically.",
    long_summary: "Marie Kondo presents the KonMari method for tidying and organizing. The book teaches how to declutter by category, keeping only items that spark joy. Kondo explains proper folding techniques, storage methods, and how to maintain an organized home. The approach combines practical techniques with philosophical insights about possessions.",
    key_insights: [
      "Keep only what sparks joy",
      "Tidy by category not location",
      "Proper folding saves space",
      "Items deserve respect",
      "Tidying is a special event",
      "Organization creates peace",
      "Minimalism brings freedom"
    ]
  },
  {
    title: "Spark Joy",
    author: "Marie Kondo",
    short_summary: "Illustrated guide to the KonMari method with specific techniques for organizing different types of items.",
    long_summary: "Marie Kondo provides an illustrated guide to the KonMari tidying method with specific techniques for different items. The book shows how to fold clothes, organize papers, arrange sentimental items, and create storage solutions. Kondo addresses common tidying challenges and provides visual guidance for implementing the method.",
    key_insights: [
      "Visual organization works best",
      "Folding techniques maximize space",
      "Storage should be visible",
      "Sentimental items need special care",
      "Proper maintenance prevents clutter",
      "Joy guides all decisions",
      "Order creates happiness"
    ]
  },
  {
    title: "Minimalism",
    author: "Joshua Fields Millburn",
    short_summary: "Minimalism is about removing the non-essential to make room for what truly matters in life.",
    long_summary: "Joshua Fields Millburn presents minimalism as a tool to remove distractions and focus on what's important. The book explores how minimalism applies to possessions, relationships, health, and passions. Millburn shows how living with less creates more—more time, more money, more satisfaction, and more meaning.",
    key_insights: [
      "Less creates more",
      "Essentialism beats maximalism",
      "Possessions don't equal happiness",
      "Freedom requires detachment",
      "Values guide choices",
      "Intention beats accumulation",
      "Minimalism applies to all life areas"
    ]
  },
  {
    title: "Everything That Remains",
    author: "Joshua Fields Millburn",
    short_summary: "Memoir of discovering minimalism and how it transformed life, relationships, and perspective.",
    long_summary: "Joshua Fields Millburn shares his personal journey from material success to meaningful minimalism. The memoir explores how discovering minimalism transformed his life, relationships, and perspective on what matters. Millburn shows how letting go of possessions created space for growth, love, and purpose.",
    key_insights: [
      "Material success doesn't fulfill",
      "Letting go creates space",
      "Relationships matter more than things",
      "Minimalism enables freedom",
      "Growth requires discomfort",
      "Purpose provides direction",
      "Love transforms life"
    ]
  },
  {
    title: "The More of Less",
    author: "Joshua Becker",
    short_summary: "Minimalism as a lifestyle that removes excess to focus on essential things that bring lasting satisfaction.",
    long_summary: "Joshua Becker presents minimalism as a lifestyle that removes excess to focus on essentials. The book shows how minimalism applies to possessions, time, money, and relationships. Becker explains how living with less creates more opportunity, more freedom, and more satisfaction in what truly matters.",
    key_insights: [
      "Minimalism is intentional living",
      "Excess distracts from essentials",
      "Less creates more opportunity",
      "Freedom requires fewer obligations",
      "Values guide minimalism",
      "Satisfaction comes from essentials",
      "Generosity increases joy"
    ]
  },
  {
    title: "Love Does",
    author: "Bob Goff",
    short_summary: "Love is an action verb—living an engaged, whimsical life of adventure and service to others.",
    long_summary: "Bob Goff presents love as an action verb through stories of whimsical adventures and meaningful service. The book encourages living engaged, purposeful lives filled with capers, kindness, and courage. Goff shows how love expresses itself through action, risk, and authentic relationships with others.",
    key_insights: [
      "Love requires action",
      "Adventure creates meaning",
      "Whimsy brings joy",
      "Service expresses love",
      "Courage enables engagement",
      "Relationships require presence",
      "Faith guides action"
    ]
  },
  {
    title: "Everybody Always",
    author: "Bob Goff",
    short_summary: "Learning to love difficult people—enemies, strangers, and friends—through extravagant generosity and grace.",
    long_summary: "Bob Goff explores how to love everybody always, including difficult people, enemies, and strangers. The book shares stories of extravagant generosity, boundary-pushing love, and grace. Goff shows how loving difficult people transforms both the giver and receiver through radical acceptance and service.",
    key_insights: [
      "Love everyone without exception",
      "Generosity transforms giver",
      "Grace overcomes judgment",
      "Boundaries guide love",
      "Presence shows care",
      "Difficult people need love most",
      "Service demonstrates love"
    ]
  },
  {
    title: "The Power of Full Engagement",
    author: "Jim Loehr",
    short_summary: "Managing energy rather than time creates high performance and renewal through oscillation between stress and recovery.",
    long_summary: "Jim Loehr and Tony Schwartz present a new approach to high performance based on managing energy rather than time. The book teaches that performance, health, and happiness depend on managing four energy sources: physical, emotional, mental, and spiritual. The authors emphasize oscillation between energy expenditure and recovery, and building positive energy rituals.",
    key_insights: [
      "Energy management beats time management",
      "Oscillation creates sustainability",
      "Four energy sources need balance",
      "Rituals build energy capacity",
      "Recovery enables high performance",
      "Positive rituals create success",
      "Strategic disengagement prevents burnout"
    ]
  },
  {
    title: "The E-Myth Revisited",
    author: "Michael Gerber",
    short_summary: "Most small businesses fail because owners work in their business rather than on it—treat your business as a system to be replicated.",
    long_summary: "Michael E. Gerber explains why most small businesses fail and how to succeed by working on your business, not in it. The book distinguishes between the Entrepreneur, Manager, and Technician mindsets. Gerber presents the Franchise Prototype concept—systematizing your business so it can run without you. The approach combines business strategy, systems thinking, and practical guidance.",
    key_insights: [
      "Work on your business not in it",
      "Systems create scalability",
      "Entrepreneur, Manager, Technician roles",
      "Franchise prototype enables replication",
      "Business development creates freedom",
      "Documentation builds consistency",
      "Turn-key businesses sell for more"
    ]
  }
];

// Main function to fill remaining summaries
async function fillRemainingSummaries() {
  try {
    console.log('Fetching books from Supabase...');
    
    // Fetch all books
    const { data: books, error: booksError } = await supabase
      .from('books')
      .select('id, title, author')
      .order('title');
    
    if (booksError) {
      console.error('Error fetching books:', booksError);
      return;
    }
    
    console.log(`Found ${books.length} books`);
    
    // Fetch existing summaries
    const { data: existingSummaries, error: summariesError } = await supabase
      .from('summaries')
      .select('book_id');
    
    if (summariesError) {
      console.error('Error fetching summaries:', summariesError);
      return;
    }
    
    const existingBookIds = new Set(existingSummaries?.map(s => s.book_id) || []);
    const missingBooks = books.filter(book => !existingBookIds.has(book.id));
    
    console.log(`Books missing summaries: ${missingBooks.length}`);
    
    if (missingBooks.length === 0) {
      console.log('All books already have summaries!');
      return;
    }
    
    // Process missing books
    for (let i = 0; i < missingBooks.length; i++) {
      const book = missingBooks[i];
      console.log(`Processing book ${i + 1}/${missingBooks.length}: ${book.title}`);
      
      // Find matching hardcoded summary
      const hardcodedSummary = additionalSummaries.find(
        summary => summary.title === book.title && summary.author === book.author
      );
      
      if (hardcodedSummary) {
        // Insert into summaries table
        const { error: insertError } = await supabase
          .from('summaries')
          .insert([{
            book_id: book.id,
            short_summary: hardcodedSummary.short_summary,
            long_summary: hardcodedSummary.long_summary,
            key_insights: hardcodedSummary.key_insights
          }]);
        
        if (insertError) {
          console.error(`Error inserting summary for ${book.title}:`, insertError);
        } else {
          console.log(`✅ Successfully added summary for: ${book.title}`);
        }
      } else {
        console.log(`❌ No hardcoded summary found for: ${book.title} by ${book.author}`);
      }
    }
    
    console.log('✅ Remaining summary insertion completed!');
    
  } catch (error) {
    console.error('Error in fillRemainingSummaries:', error);
  }
}

// Run the function
fillRemainingSummaries();
