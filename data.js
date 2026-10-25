/* ========================================
   CINEMADEANNY - Dados iniciais
   ======================================== */

const SAMPLE_FILMES = [
  {
    id: 'f1',
    titulo: 'Casablanca',
    ano: 1942,
    genero: ['Romance', 'Drama', 'Clássicos'],
    sinopse: 'Durante a Segunda Guerra Mundial, um americano cínico encontra seu antigo amor em Casablanca, onde deve escolher entre o amor e a liberdade.',
    classificacao: 'Livre',
    notaAnny: 9.5,
    elenco: 'Humphrey Bogart, Ingrid Bergman, Paul Henreid',
    direcao: 'Michael Curtiz',
    tipo: 'filme'
  },
  {
    id: 'f2',
    titulo: 'O Poderoso Chefão',
    ano: 1972,
    genero: ['Drama', 'Crime', 'Clássicos'],
    sinopse: 'A saga da família Corleone, uma das mais poderosas famílias da máfia italiana em Nova York, e a transformação de Michael Corleone.',
    classificacao: '14 anos',
    notaAnny: 10,
    elenco: 'Marlon Brando, Al Pacino, James Caan',
    direcao: 'Francis Ford Coppola',
    tipo: 'filme'
  },
  {
    id: 'f3',
    titulo: 'Psicose',
    ano: 1960,
    genero: ['Terror', 'Suspense', 'Clássicos'],
    sinopse: 'Uma secretária que foge com dinheiro roubado se hospeda em um motel isolado dirigido por um jovem perturbado e sua mãe dominante.',
    classificacao: '14 anos',
    notaAnny: 9.0,
    elenco: 'Anthony Perkins, Janet Leigh, Vera Miles',
    direcao: 'Alfred Hitchcock',
    tipo: 'filme'
  },
  {
    id: 'f4',
    titulo: 'A Felicidade Não se Compra',
    ano: 1946,
    genero: ['Drama', 'Fantasia', 'Clássicos'],
    sinopse: 'Um anjo é enviado para mostrar a um homem desesperado como a vida das pessoas ao seu redor seria diferente se ele nunca tivesse existido.',
    classificacao: 'Livre',
    notaAnny: 9.2,
    elenco: 'James Stewart, Donna Reed, Lionel Barrymore',
    direcao: 'Frank Capra',
    tipo: 'filme'
  },
  {
    id: 'f5',
    titulo: 'Cantando na Chuva',
    ano: 1952,
    genero: ['Comédia', 'Romance', 'Clássicos'],
    sinopse: 'Um astro do cinema mudo luta para se adaptar à chegada dos filmes falados, enquanto se apaixona por uma jovem aspirante a atriz.',
    classificacao: 'Livre',
    notaAnny: 9.0,
    elenco: 'Gene Kelly, Debbie Reynolds, Donald O\'Connor',
    direcao: 'Stanley Donen, Gene Kelly',
    tipo: 'filme'
  },
  {
    id: 'f6',
    titulo: 'Cidadão Kane',
    ano: 1941,
    genero: ['Drama', 'Clássicos'],
    sinopse: 'A vida e o legado do magnata da imprensa Charles Foster Kane são investigados após sua morte, revelando a complexidade de um homem poderoso.',
    classificacao: 'Livre',
    notaAnny: 9.8,
    elenco: 'Orson Welles, Joseph Cotten, Dorothy Comingore',
    direcao: 'Orson Welles',
    tipo: 'filme'
  },
  {
    id: 'f7',
    titulo: 'O Iluminado',
    ano: 1980,
    genero: ['Terror', 'Suspense'],
    sinopse: 'Um escritor aceita o emprego de zelador de um hotel isolado durante o inverno e, aos poucos, começa a perder a sanidade.',
    classificacao: '16 anos',
    notaAnny: 8.5,
    elenco: 'Jack Nicholson, Shelley Duvall, Danny Lloyd',
    direcao: 'Stanley Kubrick',
    tipo: 'filme'
  },
  {
    id: 'f8',
    titulo: 'La La Land',
    ano: 2016,
    genero: ['Romance', 'Drama', 'Comédia'],
    sinopse: 'Um pianista de jazz e uma atriz aspirante se apaixonam em Los Angeles enquanto perseguem seus sonhos artísticos.',
    classificacao: '12 anos',
    notaAnny: 8.0,
    elenco: 'Ryan Gosling, Emma Stone',
    direcao: 'Damien Chazelle',
    tipo: 'filme'
  }
];

const SAMPLE_SERIES = [
  {
    id: 's1',
    titulo: 'Breaking Bad',
    ano: 2008,
    genero: ['Drama', 'Crime', 'Suspense'],
    sinopse: 'Um professor de química com câncer terminal começa a produzir metanfetamina para garantir o futuro da família.',
    temporadas: 5,
    status: 'Concluída',
    notaAnny: 9.7,
    tipo: 'serie'
  },
  {
    id: 's2',
    titulo: 'The Crown',
    ano: 2016,
    genero: ['Drama', 'História'],
    sinopse: 'A vida da Rainha Elizabeth II e os eventos que moldaram a segunda metade do século XX.',
    temporadas: 6,
    status: 'Concluída',
    notaAnny: 8.8,
    tipo: 'serie'
  },
  {
    id: 's3',
    titulo: 'Stranger Things',
    ano: 2016,
    genero: ['Suspense', 'Fantasia', 'Drama'],
    sinopse: 'Em uma pequena cidade, um grupo de amigos enfrenta forças sobrenaturais e experimentos secretos do governo.',
    temporadas: 4,
    status: 'Em andamento',
    notaAnny: 8.2,
    tipo: 'serie'
  },
  {
    id: 's4',
    titulo: 'Succession',
    ano: 2018,
    genero: ['Drama', 'Comédia'],
    sinopse: 'A disputa pelo controle de um império midiático entre os filhos de um poderoso patriarca.',
    temporadas: 4,
    status: 'Concluída',
    notaAnny: 9.0,
    tipo: 'serie'
  },
  {
    id: 's5',
    titulo: 'The Queen\'s Gambit',
    ano: 2020,
    genero: ['Drama'],
    sinopse: 'Uma órfã prodígio do xadrez luta contra vícios e preconceitos enquanto sobe ao topo do mundo dos torneios.',
    temporadas: 1,
    status: 'Concluída',
    notaAnny: 9.1,
    tipo: 'serie'
  }
];

const SAMPLE_DOCS = [
  {
    id: 'd1',
    titulo: 'Won\'t You Be My Neighbor?',
    ano: 2018,
    genero: ['Biografias', 'Sociedade'],
    sinopse: 'Um olhar carinhoso sobre a vida e o legado de Fred Rogers, o criador do programa infantil Mister Rogers\' Neighborhood.',
    tema: 'Biografias',
    notaAnny: 9.0,
    tipo: 'doc'
  },
  {
    id: 'd2',
    titulo: 'Free Solo',
    ano: 2018,
    genero: ['Natureza', 'Biografias'],
    sinopse: 'O escalador Alex Honnold tenta a primeira escalada em solo livre da face de El Capitan, no Parque Yosemite.',
    tema: 'Natureza',
    notaAnny: 8.7,
    tipo: 'doc'
  },
  {
    id: 'd3',
    titulo: 'The Act of Killing',
    ano: 2012,
    genero: ['História', 'Crimes reais', 'Sociedade'],
    sinopse: 'Ex-membros de esquadrões da morte indonésios reencenam seus crimes de forma teatral, revelando a banalidade do mal.',
    tema: 'Crimes reais',
    notaAnny: 9.3,
    tipo: 'doc'
  },
  {
    id: 'd4',
    titulo: 'They\'ll Love Me When I\'m Dead',
    ano: 2018,
    genero: ['Cinema', 'Biografias'],
    sinopse: 'Os últimos anos de Orson Welles e a batalha para finalizar seu filme The Other Side of the Wind.',
    tema: 'Cinema',
    notaAnny: 8.0,
    tipo: 'doc'
  }
];

const SAMPLE_CURIOSIDADES = [
  {
    id: 'c1',
    titulo: 'A frase mais famosa de Casablanca quase não existiu',
    texto: 'A icônica frase "Here\'s looking at you, kid" não estava no roteiro original. Humphrey Bogart a improvisou durante as filmagens, inspirado em uma expressão que usava ao jogar pôquer com Ingrid Bergman nos intervalos.',
    tag: 'Clássicos'
  },
  {
    id: 'c2',
    titulo: 'O chuveiro de Psicose foi filmado com chocolate',
    texto: 'Como o filme era em preto e branco, Hitchcock usou xarope de chocolate para simular o sangue na famosa cena do chuveiro. Foram necessários 7 dias para filmar os 45 segundos da sequência, com 70 ângulos de câmera diferentes.',
    tag: 'Bastidores'
  },
  {
    id: 'c3',
    titulo: 'O Poderoso Chefão quase não teve Marlon Brando',
    texto: 'O estúdio era contra a contratação de Brando por considerá-lo difícil de trabalhar. Francis Ford Coppola insistiu e chegou a fazer um teste de tela secreto. Brando encheu a boca de algodão para criar o visual do Vito Corleone.',
    tag: 'Elenco'
  },
  {
    id: 'c4',
    titulo: 'Cantando na Chuva: a cena da chuva foi um pesadelo',
    texto: 'A famosa sequência em que Gene Kelly dança na chuva foi filmada com misturas de água e leite (para aparecer melhor na câmera). Kelly estava com febre de 39°C durante as filmagens, mas insistiu em continuar.',
    tag: 'Bastidores'
  },
  {
    id: 'c5',
    titulo: 'Cidadão Kane e a guerra com Hearst',
    texto: 'William Randolph Hearst, o magnata que inspirou o personagem Kane, tentou impedir o lançamento do filme. Proibiu qualquer menção a ele em seus jornais e chegou a oferecer dinheiro para que o negativo fosse destruído.',
    tag: 'História'
  },
  {
    id: 'c6',
    titulo: 'O tapete vermelho tem origem no teatro grego',
    texto: 'A tradição do tapete vermelho vem da Grécia Antiga. Na peça Agamenon, de Ésquilo (458 a.C.), já se mencionava um caminho de tecidos púrpura para receber os heróis. Hollywood apenas modernizou o ritual.',
    tag: 'História do Cinema'
  }
];

// Resenhas iniciais de exemplo
const SAMPLE_RESENHAS = [
  {
    id: 'r1',
    titulo: 'Casablanca: o eterno clássico do amor e da escolha',
    filme: 'Casablanca',
    tipo: 'filme',
    genero: 'Romance, Drama',
    nota: 9.5,
    status: 'publicado',
    data: '2024-11-15',
    corpo: 'Poucos filmes conseguem equilibrar romance, política e moralidade com a elegância de Casablanca. Bogart e Bergman têm uma química que transcende o tempo. A fotografia em preto e branco, a trilha e os diálogos icônicos fazem deste filme uma experiência que se renova a cada revisita.\n\nO que mais me emociona é a escolha final de Rick: abrir mão do amor pessoal por uma causa maior. Em tempos de individualismo, essa mensagem ainda ressoa com força. Um filme que merece ser visto — e revisto — por qualquer amante do cinema.'
  },
  {
    id: 'r2',
    titulo: 'O Poderoso Chefão: a perfeição em forma de filme',
    filme: 'O Poderoso Chefão',
    tipo: 'filme',
    genero: 'Drama, Crime',
    nota: 10,
    status: 'publicado',
    data: '2024-12-02',
    corpo: 'Há filmes bons, há filmes ótimos, e há O Poderoso Chefão. Coppola criou não apenas uma história de máfia, mas um retrato profundo sobre família, poder, lealdade e a corrupção da alma.\n\nA transformação de Michael Corleone é uma das maiores arcs de personagem já colocadas na tela. Cada cena é meticulosamente construída. A trilha de Nino Rota, a fotografia sombria, as atuações... tudo converge para uma obra-prima absoluta.\n\nNota 10 sem hesitação. Um dos poucos filmes que realmente merecem o título de perfeito.'
  }
];
