import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://aeiefvgdvpyicadnoqbz.supabase.co'
const supabaseKey = 'sb_publishable_F6RGrHrjx3LEXgYaHc4TyA_PSylwrMO'

export const supabase = createClient(supabaseUrl, supabaseKey)
