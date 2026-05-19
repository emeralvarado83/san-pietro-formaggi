export function cloudinaryUrl(
  url: string,
  opts?: { width?: number; height?: number; fit?: 'crop' | 'fill' | 'scale' }
) {
  if (!url || !url.includes('res.cloudinary.com')) return url

  const { width, height, fit = 'fill' } = opts ?? {}
  const transforms: string[] = ['f_auto', 'q_auto']
  if (width) transforms.push(`w_${width}`)
  if (height) transforms.push(`h_${height}`)
  transforms.push(`c_${fit}`)

  return url.replace('/upload/', `/upload/${transforms.join(',')}/`)
}
