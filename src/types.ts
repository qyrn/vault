export type Difficulty = 'Débutant' | 'Intermédiaire' | 'Avancé'

export interface Resource {
  name: string
  url: string
  tag: string
  desc: string
  difficulty: Difficulty | null
  special?: string
  adminOnly?: boolean
  custom?: boolean
  isPrivate?: boolean
  builtinEdited?: boolean
  category?: string
}

export interface Category {
  category: string
  icon: string
  color: string
  items: Resource[]
}

export interface FavItem {
  name: string
  url: string
}

export interface EditedBuiltin {
  originalName: string
  originalUrl: string
  name: string
  url: string
  tag: string
  desc: string
  category?: string
  difficulty?: Difficulty | null
}

export interface DeletedBuiltin {
  name: string
  url: string
}

export interface CustomResource {
  name: string
  url: string
  tag: string
  desc: string
  category: string
  difficulty: Difficulty | null
  isPrivate?: boolean
  custom?: boolean
}

export interface ResourceWithMeta extends Resource {
  category: string
  catColor: string
  catIcon: string
}

export interface MergedCategory {
  category: string
  icon: string
  color: string
  items: Resource[]
}
