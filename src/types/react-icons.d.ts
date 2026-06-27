import 'react-icons';

declare module 'react-icons' {
  export type IconType = React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
}
