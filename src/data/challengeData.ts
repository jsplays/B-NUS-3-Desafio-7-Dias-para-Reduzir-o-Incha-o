import { DayData } from '../types/challenge';

export const MEDICAL_DISCLAIMER_TEXT = {
  title: "Aviso Importante e Termos de Uso Educativo",
  content: `Este material tem finalidade educativa e não substitui consulta, diagnóstico ou tratamento realizado por médico, nutricionista, psicólogo ou outro profissional habilitado.

As sugestões são gerais e podem não ser adequadas para todas as pessoas. Gestantes, lactantes, adolescentes, pessoas idosas, pessoas com diabetes, hipertensão, doenças renais, doenças gastrointestinais, transtornos alimentares, alergias ou outras condições de saúde devem buscar orientação individualizada antes de iniciar mudanças alimentares ou de atividade física.

Não existe resultado igual para todas as pessoas. O objetivo deste programa é ajudar você a desenvolver hábitos mais consistentes, e não estabelecer uma meta obrigatória de peso.

Interrompa a atividade e procure atendimento se sentir dor no peito, falta de ar intensa, desmaio, confusão, palpitações persistentes ou qualquer sintoma importante. Sinta-se à vontade para ajustar o ritmo conforme necessário para sua segurança. Por favor, confirme se você compreendeu estas diretrizes de segurança antes de prosseguir.`
};

export const EMERGENCY_WARNINGS = [
  "Dor abdominal intensa ou de início súbito",
  "Vômitos persistentes ou incapacidade de reter líquidos",
  "Febre ou calafrios associados ao inchaço",
  "Presença de sangue nas fezes ou urina",
  "Falta de ar, dor no peito ou palpitações fortes",
  "Abdômen excessivamente endurecido ou doloroso ao menor toque",
  "Incapacidade total de evacuar ou eliminar gases há dias",
  "Perda de peso não intencional e sem explicação",
  "Inchaço súbito ou assimétrico em pernas, mãos, língua ou rosto"
];

export const DAYS_DATA: DayData[] = [
  {
    dayNumber: 1,
    title: "O Corte do Sódio Oculto",
    subtitle: "Identificar alimentos ricos em sódio e fazer trocas inteligentes",
    tagline: "Menos industrializados, mais temperos da terra",
    objective: "Identificar alimentos que costumam concentrar muito sódio e fazer trocas simples, sem retirar completamente o sal da alimentação. A maior parte do sódio vem de ultraprocessados, embutidos e caldos prontos.",
    taskTitle: "Tarefa Principal: Rastreio de Rótulos",
    taskDescription: "Hoje, escolha pelo menos 3 produtos que você costuma consumir e observe a tabela nutricional e lista de ingredientes. Reduza a frequência e substitua itens com alto teor de sódio.",
    taskBullets: [
      "Presunto, mortadela, salame e peito de peru",
      "Salsicha, linguiça e hambúrguer ultraprocessado",
      "Macarrão instantâneo e temperos prontos em cubo",
      "Salgadinhos de pacote e biscoitos recheados",
      "Molhos prontos e queijos excessivamente salgados",
      "Conservas e refeições prontas congeladas"
    ],
    swaps: [
      { from: "Tempero pronto em cubo ou pó", to: "Alho, cebola, limão, páprica, orégano, cúrcuma e ervas frescas" },
      { from: "Caldo de carne/galinha industrializado", to: "Caldo caseiro aromático com legumes e ervas" },
      { from: "Salgadinho de pacote", to: "Pipoca caseira estourada no milho com pouco sal" },
      { from: "Molho de tomate pronto com açúcar e aditivos", to: "Tomates frescos picados ou passata simples" },
      { from: "Embutidos (presunto, peito de peru)", to: "Frango desfiado, ovos mexidos ou atum com baixo sódio" },
      { from: "Sopa instantânea em pó", to: "Sopa caseira rápida de legumes picados com frango" }
    ],
    recipe: {
      title: "Água Aromatizada Refrescante",
      description: "Uma maneira agradável de estimular a ingestão hídrica ao longo do dia com aroma natural cítrico e botânico. Não é diurético milagroso, mas torna o hábito de beber água delicioso.",
      imagePath: "/src/assets/images/hero_wellness_water_1790973709372.jpg",
      ingredients: [
        "500 ml a 1 litro de água filtrada ou mineral fresca",
        "Rodelas finas de limão siciliano ou tahiti (ou laranja)",
        "Folhas frescas de hortelã ou manjericão",
        "Fatias finas de pepino (opcional)",
        "Cubos de gelo a gosto"
      ],
      instructions: [
        "Lave bem as frutas e as folhas de hortelã.",
        "Em uma jarra de vidro limpa, adicione as rodelas de limão e as folhas levemente pressionadas com os dedos para liberar os óleos essenciais.",
        "Despeje a água e adicione gelo a gosto.",
        "Deixe descansar na geladeira por 30 minutos a 2 horas antes de servir. Consumir em até 24 horas."
      ],
      tips: "Se você tiver refluxo, gastrite ou desconforto gástrico com cítricos, substitua o limão por fatias de morango, pepino e folhas de hortelã pura."
    },
    checklist: [
      { id: "d1_c1", label: "Observei os rótulos de pelo menos três produtos comuns da minha despensa" },
      { id: "d1_c2", label: "Reduzi ou troquei um alimento muito salgado por uma opção menos processada" },
      { id: "d1_c3", label: "Usei temperos naturais (alho, ervas, limão, especiarias) em pelo menos uma refeição" },
      { id: "d1_c4", label: "Bebi água de forma distribuída ao longo do dia" },
      { id: "d1_c5", label: "Anotei como meu corpo se sentiu após as refeições" }
    ],
    primaryToolType: 'water'
  },
  {
    dayNumber: 2,
    title: "Hidratação Inteligente",
    subtitle: "Distribuir líquidos sem exageros e regular o organismo",
    tagline: "Água em pequenos goles ao longo do dia, não litros de uma vez",
    objective: "Distribuir o consumo de líquidos e observar se você costuma esperar sentir muita sede ou beber volumes excessivos de uma só vez. A necessidade de água é individual e depende de clima, rotina e saúde.",
    taskTitle: "Tarefa Principal: O Cronograma de Copos",
    taskDescription: "Em vez de tomar 1 litro de uma vez, crie momentos intencionais para beber pequenos copos de água.",
    taskBullets: [
      "1 copo ao acordar para despertar o sistema digestivo de forma suave",
      "1 copo no meio da manhã (entre o café e o almoço)",
      "1 copo no meio da tarde (entre o almoço e o jantar)",
      "Água fresca durante ou após atividade física, respeitando sua sede",
      "Pequenos goles distribuídos ao longo do dia"
    ],
    swaps: [
      { from: "Refrigerantes comuns ou zero com gás excessivo", to: "Água filtrada ou água aromatizada com hortelã" },
      { from: "Sucos industrializados em caixa cheios de açúcar", to: "Fruta inteira mastigada + copo de água" },
      { from: "Beber 1,5L de uma vez antes de dormir", to: "Copos pequenos espaçados a cada 2 a 3 horas" }
    ],
    recipe: {
      title: "Infusão Calmante Digestiva (Opcional)",
      description: "Uma infusão suave para o meio da tarde ou antes de dormir, aconchegante e sem calorias ou adoçantes artificiais.",
      imagePath: "/src/assets/images/herbal_tea_infusion_1790973720141.jpg",
      ingredients: [
        "250 ml de água quase fervente (cerca de 90°C)",
        "1 colher de sobremesa de flores de camomila ou folhas de erva-cidreira ou hortelã"
      ],
      instructions: [
        "Aqueça a água até iniciar as primeiras bolhas no fundo da panela ou chaleira.",
        "Despeje sobre a erva em uma caneca e tampe com um pires.",
        "Deixe em infusão por 5 a 10 minutos para extrair os compostos aromáticos.",
        "Coe e aprecie morna ou fria, sem adoçar."
      ],
      tips: "Infusões naturais não têm finalidade mágica de eliminar gordura. Gestantes e pessoas usando medicações devem consultar seu profissional antes de consumir ervas medicinais."
    },
    checklist: [
      { id: "d2_c1", label: "Mantive uma garrafa de água por perto na mesa ou ambiente de trabalho" },
      { id: "d2_c2", label: "Distribuí a ingestão de líquidos ao longo da manhã, tarde e início da noite" },
      { id: "d2_c3", label: "Evitei beber grandes volumes de uma só vez (sem empanturrar o estômago)" },
      { id: "d2_c4", label: "Observei a cor da urina (ideal: amarelo claro límpido, sem obsessão)" },
      { id: "d2_c5", label: "Evitei refrigerantes gaseificados ou bebidas ultra adoçadas" }
    ],
    primaryToolType: 'water'
  },
  {
    dayNumber: 3,
    title: "Alimentos que Causam Desconforto",
    subtitle: "Rastrear fermentação e hábitos ao comer sem listas de proibição",
    tagline: "Observe seu corpo: o que causa estufamento para você?",
    objective: "Identificar alimentos e hábitos diários que podem aumentar a formação de gases ou sensação de distensão abdominal, sem cortar grupos alimentares inteiros sem necessidade.",
    taskTitle: "Tarefa Principal: Diário de Sensibilidade & Mastigação",
    taskDescription: "Muitas vezes o inchaço não vem apenas do alimento, mas da forma como comemos: rápido demais, engolindo ar, ou conversando aflito durante a refeição.",
    taskBullets: [
      "Comer rápido demais e sem mastigar adequadamente (favorece aerofagia)",
      "Falar excessivamente enquanto mastiga ou mastigar chiclete",
      "Beber líquidos usando canudos (puxa bolhas de ar para o estômago)",
      "Bebidas gaseificadas e refrigerantes",
      "Ficar muitas horas em jejum forçado e depois comer uma porção gigante",
      "Alimentos com alta fermentação individual (feijão sem remolho, repolho, adoçantes polióis)"
    ],
    swaps: [
      { from: "Comer em 5 minutos olhando para a tela do celular", to: "Sentar confortavelmente e mastigar cada garfada com calma (15-20 min)" },
      { from: "Feijão cozido direto do pacote", to: "Feijão deixado de remolho em água por 12-24h com troca de água (reduz fitatos e gases)" },
      { from: "Eliminar 10 alimentos de uma vez só", to: "Testar apenas UM ajuste por 24 horas para ter clareza do impacto" }
    ],
    recipe: {
      title: "Prato Equilibrado & Leve para a Digestão",
      description: "Uma composição balanceada com digestão facilitada, sem pesar no estômago.",
      ingredients: [
        "1 porção de proteína magra (peito de frango grelhado, filé de peixe ou ovos cozidos/pochê)",
        "1 porção de carboidrato de fácil digestão (arroz branco ou batata cozida sem excesso de gordura)",
        "Legumes cozidos no vapor (cenoura macia, abobrinha, chuchu)",
        "Folhas verdes macias se toleradas",
        "1 fio de azeite de oliva extravirgem e gotas de limão"
      ],
      instructions: [
        "Monte o prato dividindo visualmente: metade para legumes e verduras cozidas, um quarto para proteína e um quarto para o carboidrato.",
        "Coma em ambiente calmo, pousando os talheres entre as garfadas.",
        "Pare de comer no momento em que sentir 80% de saciedade confortável."
      ],
      tips: "Legumes cozidos ou no vapor são muito mais gentis com o trato digestivo do que grandes tigelas de folhas cruas se você estiver com o abdômen sensível."
    },
    checklist: [
      { id: "d3_c1", label: "Fiz o registro das minhas principais refeições e como meu estômago reagiu" },
      { id: "d3_c2", label: "Mastiguei cada garfada com calma, sem engolir pedaços inteiros" },
      { id: "d3_c3", label: "Reduzi apenas UM possível gatilho para testar (ex: refrigerante, canudo ou chiclete)" },
      { id: "d3_c4", label: "Não eliminei grupos alimentares inteiros sem diagnóstico profissional" },
      { id: "d3_c5", label: "Montei pelo menos uma refeição equilibrada com proteína, carboidrato e legumes cozidos" }
    ],
    primaryToolType: 'food_journal'
  },
  {
    dayNumber: 4,
    title: "Começar Bem o Dia",
    subtitle: "Despertar com movimento suave e sem restrições milagrosas",
    tagline: "Sem 'queimadores de gordura', com movimento gentil e consistência",
    objective: "Criar uma manhã simples e revigorante sem depender de shots caros ou promessas de aceleração milagrosa de metabolismo. Nenhuma bebida isolada queima gordura.",
    taskTitle: "Tarefa Principal: Despertar Consciente em 5 Minutos",
    taskDescription: "Ao acordar, dedique 5 minutos para oxigenar o corpo, soltar a musculatura das costas e ativar a circulação sanguínea e linfática.",
    taskBullets: [
      "1 minuto: Caminhada leve e descalça pelo ambiente",
      "30 segundos: Círculos suaves com os ombros para trás e para frente",
      "30 segundos: Rotações suaves dos tornozelos (30s cada lado)",
      "30 segundos: Alongamento suave dos braços acima da cabeça com respiração profunda",
      "2 minutos: Caminhada tranquila ou movimentos corporais livres"
    ],
    recipe: {
      title: "Café da Manhã Confortável: Iogurte com Aveia e Frutas",
      description: "Uma opção rica em fibras solúveis que auxiliam a microbiota intestinal e o trânsito regular.",
      ingredients: [
        "1 pote (150-170g) de iogurte natural integral simples (sem açúcar adicionado)",
        "2 colheres de sopa de aveia em flocos finos",
        "1 fruta picada da sua preferência (ex: mamão, banana madura ou morangos)",
        "Uma pitada leve de canela em pó (opcional)"
      ],
      instructions: [
        "Em uma tigela pequena, coloque o iogurte natural.",
        "Misture a aveia e aguarde 2 minutos para que os flocos absorvam levemente a umidade.",
        "Cubra com a fruta picada e finalize com a canela.",
        "Consuma mastigando bem e saboreando os ingredientes."
      ],
      tips: "Se laticínios lhe causam desconforto, opte por ovos mexidos com uma fatia de pão e uma fruta fresca."
    },
    checklist: [
      { id: "d4_c1", label: "Acordei sem tentar compensar refeições passadas com jejuns punitivos" },
      { id: "d4_c2", label: "Realizei os 5 minutos de movimento matinal suave" },
      { id: "d4_c3", label: "Tomei água em temperatura agradável de acordo com minha sede" },
      { id: "d4_c4", label: "Escolhi um café da manhã simples e nutritivo (ou esperei sentir fome real)" },
      { id: "d4_c5", label: "Evitei acreditar em promessas de 'detox instantâneo' ou shots milagrosos" }
    ],
    primaryToolType: 'morning_movement'
  },
  {
    dayNumber: 5,
    title: "Massagem Abdominal de 3 Minutos",
    subtitle: "Prática suave de relaxamento e alívio de tensões no abdômen",
    tagline: "Relaxamento diafragmático e estímulo do peristaltismo natural",
    objective: "Usar uma massagem suave como ferramenta de percepção corporal, alívio de tensões e relaxamento abdominal. A massagem não 'quebra gordura', mas ajuda a liberar gases retidos e acalmar o sistema nervoso.",
    taskTitle: "Tarefa Principal: O Protocolo de 3 Minutos",
    taskDescription: "Em local calmo, deite-se de barriga para cima com os joelhos levemente flexionados e a musculatura da barriga relaxada.",
    taskBullets: [
      "Minuto 1: Respiração diafragmática (inspira 4s, expira 6s, 5 ciclos)",
      "Minuto 2: Movimentos circulares lentos no sentido horário ao redor do umbigo",
      "Minuto 3: Deslizamento suave e 3 respirações lentas de relaxamento",
      "Caminhada leve de 10 minutos após o almoço para favorecer o trânsito digestivo"
    ],
    tips: [
      "Contraindicações: NÃO faça se estiver grávida sem liberação médica, se tiver cirurgia abdominal recente, dor aguda súbita, febre, hérnia dolorosa ou barriga em tábua.",
      "Nunca pressione com força excessiva. A pressão deve ser superficial e relaxante, como espalhar um creme hidratante."
    ],
    checklist: [
      { id: "d5_c1", label: "Verifiquei que não possuo contraindicações médicas para a massagem suave" },
      { id: "d5_c2", label: "Realizei o minuto de respiração profunda e lenta (4s inspira, 6s expira)" },
      { id: "d5_c3", label: "Fiz os movimentos circulares com pressão leve no sentido horário" },
      { id: "d5_c4", label: "Fiz uma caminhada leve de 10 minutos ou evitei ficar sentado direto após comer" },
      { id: "d5_c5", label: "Observei se a prática trouxe relaxamento e sensação de alívio" }
    ],
    primaryToolType: 'massage_timer'
  },
  {
    dayNumber: 6,
    title: "Jantar Leve e Completo",
    subtitle: "Jantar nutritivo e confortável sem passar fome ou cortar carboidratos",
    tagline: "Nutrição suficiente para dormir bem, sem sensação de estômago pesado",
    objective: "Montar um jantar nutritivo, acolhedor e confortável que proporcione saciedade equilibrada para uma noite de sono reparadora, sem cair na armadilha de dormir com fome para 'compensar'.",
    taskTitle: "Tarefa Principal: Montagem do Jantar Consciente",
    taskDescription: "Escolha uma combinação equilibrada e jante pelo menos 2 horas antes de deitar.",
    taskBullets: [
      "Opção 1: Bowl de arroz, frango grelhado desfiado e legumes no vapor",
      "Opção 2: Omelete de 2 ovos com legumes picadinhos + batata cozida ou pão",
      "Opção 3: Sopa caseira rica em legumes aromáticos e fonte de proteína",
      "Opção 4: Prato tradicional com porções confortáveis de arroz, feijão, proteína e salada cozida"
    ],
    recipe: {
      title: "Sopa Aconchegante de Legumes com Frango Desfiado",
      description: "Uma receita quentinha, fácil de digerir, rica em potássio e livre de aditivos químicos.",
      imagePath: "/src/assets/images/balanced_light_dinner_1790973729652.jpg",
      ingredients: [
        "1 filé de peito de frango cozido e desfiado",
        "1 cenoura média em cubinhos",
        "1 abobrinha em cubos",
        "1 batata pequena picada",
        "½ cebola picadinha e 1 dente de alho amassado",
        "1 litro de água filtrada",
        "1 fio de azeite e cheiro-verde fresco a gosto",
        "Pitada de sal marinho e cúrcuma"
      ],
      instructions: [
        "Em uma panela, refogue a cebola e o alho com um fio de azeite até dourarem suavemente.",
        "Adicione a cenoura, a batata picada e a água.",
        "Cozinhe em fogo médio até os legumes começarem a amaciar (cerca de 15 minutos).",
        "Junte a abobrinha e o frango cozido desfiado, cozinhando por mais 5 minutos.",
        "Desligue o fogo, salpique o cheiro-verde fresco picado e ajuste com uma pitada suave de sal."
      ],
      tips: "Não use caldos em cubo ou pós prontos cheios de glutamato e sódio. O sabor vem dos vegetais cozidos e do cheiro-verde fresco!"
    },
    checklist: [
      { id: "d6_c1", label: "Fiz um jantar nutritivo e reconfortante sem passar fome" },
      { id: "d6_c2", label: "Incluí uma boa fonte de proteína na refeição da noite" },
      { id: "d6_c3", label: "Evitei molhos industriais e temperos ultra salgados" },
      { id: "d6_c4", label: "Terminei o jantar pelo menos 1h30 a 2h antes de me deitar para dormir" },
      { id: "d6_c5", label: "Avaliei minha saciedade e fui dormir em paz com meu corpo" }
    ],
    primaryToolType: 'dinner_builder'
  },
  {
    dayNumber: 7,
    title: "Observar, Medir e Comparar",
    subtitle: "Avaliação consciente e libertadora da sua semana de autocuidado",
    tagline: "A balança mede apenas a gravidade; sua saúde mede sua energia e bem-estar",
    objective: "Avaliar o impacto dos 7 dias na sua disposição, digestão e rotina, compreendendo que oscilações corporais são normais e que a consistência de hábitos é o verdadeiro resultado.",
    taskTitle: "Tarefa Principal: O Balanço dos 7 Dias",
    taskDescription: "Compare como você estava no Dia 1 e como você se sente hoje.",
    taskBullets: [
      "Compare o nível de inchaço: do início (0 a 10) até agora",
      "Observe a energia diária, a qualidade do sono e a regularidade intestinal",
      "Medições de fita métrica (opcionais): sempre no mesmo horário, sem apertar a pele",
      "Reconheça quais hábitos foram fáceis de aplicar e quais você levará adiante",
      "Assine seu compromisso de autocuidado contínuo com o Método C.A.S.A."
    ],
    tips: [
      "Variações rápidas na balança refletem oscilações de água, conteúdo intestinal e fases hormonais, não necessariamente ganho ou perda de gordura corporal.",
      "O maior ganho desta semana é a conexão e o respeito com os sinais do seu organismo."
    ],
    checklist: [
      { id: "d7_c1", label: "Completei o registro comparativo entre o Dia 1 e o Dia 7" },
      { id: "d7_c2", label: "Avaliei sono, digestão e nível de energia com honestidade e carinho" },
      { id: "d7_c3", label: "Identifiquei pelo menos um hábito positivo que vou manter na próxima semana" },
      { id: "d7_c4", label: "Li as 5 diretrizes contínuas do Protocolo Verão 42" },
      { id: "d7_c5", label: "Formalizei minha promessa de cuidado contínuo sem punição" }
    ],
    primaryToolType: 'compare_metrics'
  }
];

export const GRADUATION_CHECKLIST_ITEMS = [
  "Reduzi alimentos muito salgados e ultraprocessados no meu cotidiano",
  "Distribuí melhor o consumo de água ao longo do dia",
  "Observei e reduzi possíveis gatilhos alimentares que causavam estufamento",
  "Evitei bebidas gaseificadas quando percebi que geravam desconforto",
  "Fiz minhas refeições completas sem me punir ou passar fome",
  "Pratiquei movimento leve, caminhadas e pausas ativas na rotina",
  "Aprendi a observar e escutar as respostas do meu corpo sem culpa",
  "Registrei meus sintomas e percepções ao longo da semana",
  "Conheço com clareza quais sinais de alerta exigem avaliação médica"
];

export const CONTINUOUS_HABITS = [
  {
    num: "1",
    title: "Beba água ao longo do dia",
    description: "Atenda à sua sede de forma fracionada, mantendo garrafas por perto e observando a cor límpida da urina."
  },
  {
    num: "2",
    title: "Priorize comida de verdade",
    description: "Baseie sua rotina em alimentos in natura ou minimamente processados: arroz, feijão, ovos, carnes magras, frutas, legumes e tubérculos."
  },
  {
    num: "3",
    title: "Reduza ultraprocessados e excesso de sal",
    description: "Dê preferência a alho, cebola, ervas frescas e especiarias naturais em vez de sachês, cubos e embutidos."
  },
  {
    num: "4",
    title: "Coma devagar e respeite sua saciedade",
    description: "Mastigue sem pressa, evite telas durante as refeições e pare quando estiver confortavelmente satisfeito."
  },
  {
    num: "5",
    title: "Movimente-se com prazer e regularidade",
    description: "Caminhadas leves, alongamentos e pausas ativas ajudam a circulação, o trânsito intestinal e o bem-estar mental."
  }
];
