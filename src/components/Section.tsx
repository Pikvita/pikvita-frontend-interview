import { ElementType, FC, PropsWithChildren } from 'react'
import { cn } from '../utils/cn'

interface Props extends PropsWithChildren {
  as?: ElementType
  className?: string
}

export const Section: FC<Props> = ({ as: Tag = 'section', children, className }) => {
  return <Tag className={cn('w-full max-w-7xl mx-auto px-4', className)}>{children}</Tag>
}
