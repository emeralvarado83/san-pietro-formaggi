export const categories = ['Freschi', 'Semistagionati', 'Stagionati', 'Specialità'] as const
export const featuredCategories = ['Freschi', 'Semistagionati', 'Stagionati'] as const

export type Category = (typeof categories)[number]

export const categoryDescriptions: Record<Category, string> = {
  Freschi: 'Formaggi a breve maturazione, dal sapore delicato e latteo, da consumare freschi.',
  Semistagionati: 'Formaggi con una stagionatura media, carattere più definito.',
  Stagionati: 'Formaggi a lunga stagionatura, sapore intenso e complesso. Il meglio del territorio.',
  Specialità: 'Produzioni uniche che esprimono il carattere più autentico della nostra tradizione casearia.',
}
