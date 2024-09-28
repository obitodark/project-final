interface Props {
  className?: string;
  children: React.ReactNode;
}

export const Box = ({className,children,...props}:Props) => {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  )
}
