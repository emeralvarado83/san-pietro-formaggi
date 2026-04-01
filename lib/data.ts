export interface Product {
  slug: string
  name: string
  category: 'Freschi' | 'Semistagionati' | 'Stagionati' | 'Specialità'
  shortDescription: string
  description: string
}

export interface Recipe {
  slug: string
  title: string
  shortDescription: string
  description: string
  ingredients: string
  preparation: string
  cheese: string
}

export const products: Product[] = [
  {
    slug: 'primo-sale',
    name: 'Primo Sale',
    category: 'Freschi',
    shortDescription: 'Formaggio fresco a pasta morbida, dal sapore delicato e leggermente salato.',
    description:
      "Il Primo Sale è il nostro formaggio fresco per eccellenza. Prodotto con latte intero di pecora locale delle Madonie, viene lavorato a mano e salato con cura seguendo la tradizione secolare di Castronovo di Sicilia. La pasta è morbida e umida, dal colore bianco avorio, con un sapore delicato e leggermente salato che ricorda il latte appena munto. Ideale consumato fresco, accompagnato da pomodori maturi, basilico fresco e un filo d'olio extravergine di oliva siciliano. La sua versatilità lo rende perfetto anche in cucina, per farcire piatti tipici o come ingrediente di insalate estive.",
  },
  {
    slug: 'ricotta-fresca',
    name: 'Ricotta Fresca',
    category: 'Freschi',
    shortDescription: 'Ricotta cremosa prodotta con siero di latte intero di pecora, dal gusto dolce e vellutato.',
    description:
      "La nostra Ricotta Fresca è ottenuta dalla lavorazione del siero di latte di pecora, rigorosamente locale e di giornata. Il processo di riscaldamento lento e accurato, condotto a mano dal nostro mastro casaro, permette di ottenere una ricotta dalla consistenza cremosa e vellutata, con un sapore dolce e delicato. Perfetta sia in preparazioni salate che dolci, è l'ingrediente fondamentale di molte ricette della tradizione siciliana, dalla pasta alla Norma ai cannoli. La sua leggerezza e freschezza la rendono un alimento prezioso in ogni stagione.",
  },
  {
    slug: 'caciocavallo-semistagionato',
    name: 'Caciocavallo Semistagionato',
    category: 'Semistagionati',
    shortDescription: 'Tradizionale formaggio a pasta filata, stagionato 3-4 mesi. Sapore intenso ma bilanciato.',
    description:
      "Il Caciocavallo Semistagionato è uno dei formaggi più rappresentativi della tradizione casearia siciliana e meridionale. Prodotto con latte crudo di vacca locale, viene lavorato con la tecnica della pasta filata — un'arte tramandata di generazione in generazione — e poi stagionato per 3-4 mesi nelle nostre cantine. Durante questo periodo sviluppa una crosta giallo paglierino e una pasta compatta ed elastica, con fine occhiatura. Il sapore è intenso, burroso e leggermente piccante, perfetto da abbinare a salumi locali, fave fresche e vini rossi strutturati del territorio.",
  },
  {
    slug: 'provola-dolce',
    name: 'Provola Dolce',
    category: 'Semistagionati',
    shortDescription: 'Formaggio a pasta filata semistagionata, dal gusto morbido con note di latte fresco.',
    description:
      "La Provola Dolce è un formaggio a pasta filata dalla forma sferica e dalla superficie liscia e lucida di colore giallo dorato. Stagionata per circa 60 giorni nelle nostre cantine naturali, mantiene una pasta elastica e fondente, con un sapore morbido e burroso che ricorda ancora il latte fresco. Eccellente consumata da sola, è anche ideale per la preparazione di arancini, supplì e piatti gratinati, dove la sua straordinaria capacità di filare al calore la rende insostituibile. Una delle nostre proposte più amate.",
  },
  {
    slug: 'pecorino-stagionato',
    name: 'Pecorino Stagionato',
    category: 'Stagionati',
    shortDescription: 'Pecorino a lunga stagionatura (minimo 6 mesi), dal sapore deciso e piccante.',
    description:
      "Il nostro Pecorino Stagionato è il risultato di una stagionatura di almeno 6 mesi nelle grotte naturali della nostra cantina. Prodotto esclusivamente con latte intero di pecora delle Madonie, presenta una crosta dura e scura, mentre la pasta interna è compatta, granulosa e di colore paglierino intenso. Il sapore è deciso, sapido e leggermente piccante, con note aromatiche che evocano il pascolo siciliano — erbe, fiori selvatici, macchia mediterranea. Ottimo grattugiato sulla pasta o sul risotto, si abbina magnificamente a miele di castagno e confetture di agrumi.",
  },
  {
    slug: 'caciocavallo-stagionato',
    name: 'Caciocavallo Stagionato',
    category: 'Stagionati',
    shortDescription: 'Caciocavallo invecchiato oltre 12 mesi, crosta dura e pasta compatta dal sapore complesso.',
    description:
      "Il Caciocavallo Stagionato è la versione più evoluta e pregiata del nostro caciocavallo, affinato con cura per oltre 12 mesi. Durante la lunga stagionatura la crosta diventa dura e rugosa, di colore bruno ambrato, mentre la pasta interna si compatta e si asciuga, sviluppando una complessità aromatica straordinaria. Il sapore è intenso, piccante e lungo, con note di fieno secco, frutta secca tostata e spezie. Un formaggio da degustazione per intenditori, che esprime il meglio del terroir siciliano. Eccellente anche da grattugia su paste e zuppe di legumi.",
  },
  {
    slug: 'pecorino-pepe-nero',
    name: 'Pecorino al Pepe Nero',
    category: 'Stagionati',
    shortDescription: 'Pecorino arricchito con grani di pepe nero macinato, per un sapore deciso e speziato.',
    description:
      "Il Pecorino al Pepe Nero è una nostra specialità che unisce la tradizione casearia siciliana con il carattere deciso del pepe nero in grani. Durante la lavorazione, il pepe viene incorporato direttamente nella pasta, creando un formaggio dal profilo aromatico complesso e avvincente. La stagionatura di 4-6 mesi permette ai sapori di fondersi armoniosamente: la piccantezza sapida del pecorino si sposa con le note speziate e pungenti del pepe, creando un formaggio memorabile e riconoscibile. Ideale abbinato a fave fresche, carciofi crudi e vini bianchi aromatici delle Eolie.",
  },
]

export const recipes: Recipe[] = [
  {
    slug: 'pasta-alla-norma',
    title: 'Pasta alla Norma con Ricotta Salata',
    shortDescription: 'Il piatto più famoso della cucina siciliana, con melanzane fritte e ricotta salata grattugiata.',
    description:
      "La Pasta alla Norma è un caposaldo assoluto della cucina siciliana. Nata a Catania ma diffusa in tutta l'isola, questa ricetta celebra i sapori più autentici del Meridione. La nostra versione utilizza la Ricotta Salata di pecora, che con la sua sapidità e consistenza granulosa esalta ogni singolo ingrediente.",
    cheese: 'Ricotta Salata',
    ingredients:
      "400g di rigatoni\n2 melanzane medie\n400g di pomodori pelati\n100g di Ricotta Salata San Pietro\n2 spicchi d'aglio\nBasilico fresco abbondante\nOlio extravergine di oliva siciliano\nSale grosso e pepe nero",
    preparation:
      "1. Tagliate le melanzane a dadini da 2 cm e salatele abbondantemente. Lasciatele riposare 30 minuti in uno scolapasta, poi asciugatele con carta assorbente.\n2. Friggete i dadini di melanzana in abbondante olio d'oliva caldo (170°C) fino a doratura uniforme. Scolate su carta assorbente.\n3. In una padella capiente, scaldate 4 cucchiai d'olio, rosolate l'aglio intero fino a doratura, poi rimuovetelo.\n4. Aggiungete i pomodori pelati schiacciati con le mani, salate e cuocete a fuoco medio per 15 minuti, finché il sugo si addensa.\n5. Cuocete i rigatoni in abbondante acqua salata, scolandoli al dente.\n6. Mantecate la pasta con il sugo di pomodoro per un minuto.\n7. Aggiungete le melanzane fritte, mescolate delicatamente.\n8. Impiattate e completate con abbondante basilico fresco e una generosa grattugiata di Ricotta Salata San Pietro.",
  },
  {
    slug: 'arancini-caciocavallo',
    title: 'Arancini al Caciocavallo',
    shortDescription: 'I classici arancini siciliani con cuore filante di Caciocavallo Semistagionato.',
    description:
      "Gli arancini sono il simbolo per eccellenza dello street food siciliano, presenti in ogni angolo dell'isola. La nostra versione casalinga prevede un cuore filante di Caciocavallo Semistagionato San Pietro, che al calore della frittura si scioglie creando un ripieno cremoso e irresistibile.",
    cheese: 'Caciocavallo Semistagionato',
    ingredients:
      "300g di riso Carnaroli o Vialone Nano\n200g di Caciocavallo Semistagionato San Pietro\n150g di ragù di carne (macinata mista)\n80g di piselli lessati\n1 bustina di zafferano siciliano\n2 uova\n100g di farina 00\n200g di pangrattato fine\nBrodo di carne q.b.\nOlio di semi per friggere\nSale",
    preparation:
      "1. Cuocete il riso con il brodo caldo e lo zafferano, mescolando spesso come un risotto. A fine cottura deve essere asciutto. Lasciatelo raffreddare completamente su una teglia.\n2. Incorporate un uovo intero al riso freddo e mescolate bene fino a compattare.\n3. Preparate il ragù con carne macinata, concentrato di pomodoro e piselli. Lasciate raffreddare.\n4. Tagliate il Caciocavallo San Pietro a cubetti da 1 cm.\n5. Con le mani leggermente bagnate, prendete una quantità di riso grande quanto un mandarino. Create una fossetta al centro.\n6. Riempite con un cucchiaio di ragù e 2-3 cubetti di Caciocavallo.\n7. Chiudete bene l'arancino con altro riso, formando una palla tonda o a pera (forma tradizionale catanese).\n8. Passate nell'uovo sbattuto, nella farina e infine nel pangrattato, pressando bene.\n9. Friggete in olio profondo a 175°C per 4-5 minuti, ruotando, fino a doratura uniforme.\n10. Scolate su carta assorbente e servite ben caldi.",
  },
  {
    slug: 'insalata-siciliana-primo-sale',
    title: 'Insalata Siciliana con Primo Sale',
    shortDescription: "Un'insalata fresca e colorata con il nostro Primo Sale, pomodori, olive e origano.",
    description:
      "Un piatto semplice ma straordinario nella sua essenzialità, che celebra i prodotti migliori del territorio siciliano. Il Primo Sale fresco di San Pietro, con la sua morbidezza e il suo sapore delicato, si abbina perfettamente alla dolcezza dei pomodori maturi di stagione e alla sapidità delle olive.",
    cheese: 'Primo Sale',
    ingredients:
      "300g di Primo Sale San Pietro\n400g di pomodori datterini e cuore di bue misti\n100g di olive nere di Sicilia (in salamoia)\n1 cipolla rossa di Tropea\nOrigano fresco o secco siciliano\nOlio extravergine di oliva DOP Sicilia\nSale marino di Sicilia\nPepe nero macinato fresco\nPane di Altamura o pane di casa siciliano",
    preparation:
      "1. Tagliate il Primo Sale San Pietro a fette spesse 1 cm o a cubetti irregolari.\n2. Affettate i pomodori in modo rustico — i datterini a metà, il cuore di bue a spicchi.\n3. Affettate finemente la cipolla di Tropea a rondelle sottilissime. Se preferite un sapore più mite, immergetela 10 minuti in acqua fredda.\n4. In un piatto largo da portata, disponete i pomodori, il Primo Sale e le olive.\n5. Aggiungete la cipolla di Tropea e l'origano abbondante.\n6. Condite generosamente con olio extravergine di oliva, un pizzico di sale marino (il formaggio è già saporito) e pepe nero macinato fresco.\n7. Lasciate riposare 10-15 minuti a temperatura ambiente prima di servire.\n8. Accompagnate con pane di casa, ideale per raccogliere il condimento.",
  },
  {
    slug: 'caponata-provola',
    title: 'Caponata con Provola Dolce',
    shortDescription: 'La caponata agrodolce siciliana arricchita con la nostra Provola che si scioglie nel caldo.',
    description:
      "La caponata è il piatto agrodolce per eccellenza della cucina siciliana — un concentrato di sapori Mediterranei che parla di storia, commerci e culture. In questa versione contemporanea, la Provola Dolce San Pietro si scioglie a contatto con la caponata ancora calda, creando una cremosità inaspettata che arricchisce il piatto.",
    cheese: 'Provola Dolce',
    ingredients:
      "2 melanzane grandi\n150g di Provola Dolce San Pietro\n3 coste di sedano\n1 cipolla bianca\n80g di olive verdi di Sicilia (snocciolate)\n3 cucchiai di capperi sotto sale (dissalati)\n3 cucchiai di pinoli tostati\n400g di pomodori pelati\n3 cucchiai di aceto di vino bianco\n1 cucchiaio di zucchero di canna\nOlio extravergine di oliva\nSale",
    preparation:
      "1. Tagliate le melanzane a cubetti da 3 cm, salatele e lasciatele spurgare 30 minuti nello scolapasta. Asciugatele bene.\n2. Friggete le melanzane in abbondante olio d'oliva fino a doratura profonda. Scolate su carta assorbente.\n3. In una padella capiente, scaldate 3 cucchiai d'olio e rosolate la cipolla a fette sottili. Aggiungete il sedano tagliato a dadini e cuocete 5 minuti.\n4. Unite le olive, i capperi dissalati e i pomodori pelati schiacciati. Cuocete a fuoco medio per 10 minuti.\n5. Aggiungete l'aceto e lo zucchero. Mescolate e cuocete altri 5 minuti fino a ottenere la consistenza agrodolce caratteristica.\n6. Unite le melanzane fritte e i pinoli. Mescolate delicatamente. Assaggiate e aggiustate di sale e agrodolce.\n7. Impiattate la caponata ancora calda in una teglia o piatto fondo.\n8. Adagiate subito sopra le fette di Provola Dolce San Pietro. Il calore della caponata le farà sciogliere leggermente, creando un effetto cremoso e filante.\n9. Servite tiepida, ottima anche il giorno dopo.",
  },
]

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter((p) => p.category === category)
}

export function getRecipe(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug)
}

export const categories: Product['category'][] = ['Freschi', 'Semistagionati', 'Stagionati', 'Specialità']

export const categoryDescriptions: Record<Product['category'], string> = {
  Freschi: 'Formaggi a breve maturazione, dal sapore delicato e latteo, da consumare freschi.',
  Semistagionati: 'Formaggi con una stagionatura media, carattere più definito e pasta elastica.',
  Stagionati: 'Formaggi a lunga stagionatura, sapore intenso e complesso. Il meglio del territorio.',
  Specialità: 'Produzioni uniche e stagionali che esprimono il carattere più autentico della nostra tradizione casearia.',
}
