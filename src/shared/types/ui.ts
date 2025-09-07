export type ButtonVariant = 
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger';

export type ButtonSize = 
  | 'sm'
  | 'md'
  | 'lg';

export interface CommonUIProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ComponentWithSize {
  size?: ButtonSize;
}

export interface ComponentWithVariant {
  variant?: ButtonVariant;
}
