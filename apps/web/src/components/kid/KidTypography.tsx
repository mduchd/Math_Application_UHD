import React from 'react';

interface KidHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3;
  children: React.ReactNode;
}

export const KidHeading: React.FC<KidHeadingProps> = ({
  level = 2,
  children,
  className = '',
  ...props
}) => {
  if (level === 1) {
    return (
      <h1 className={`text-kid-h1 ${className}`} {...props}>
        {children}
      </h1>
    );
  }
  if (level === 2) {
    return (
      <h2 className={`text-kid-h2 ${className}`} {...props}>
        {children}
      </h2>
    );
  }
  return (
    <h3 className={`text-kid-h3 ${className}`} {...props}>
      {children}
    </h3>
  );
};

interface KidTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'body' | 'body-bold' | 'sub';
  as?: 'p' | 'span' | 'div';
  children: React.ReactNode;
}

export const KidText: React.FC<KidTextProps> = ({
  variant = 'body',
  as: Component = 'p',
  children,
  className = '',
  ...props
}) => {
  const variantClass = {
    body: 'text-kid-body',
    'body-bold': 'text-kid-body-bold',
    sub: 'text-kid-sub',
  }[variant];

  return (
    <Component className={`${variantClass} ${className}`} {...props}>
      {children}
    </Component>
  );
};

interface KidBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'yellow' | 'green' | 'blue' | 'purple' | 'orange';
  children: React.ReactNode;
}

export const KidBadge: React.FC<KidBadgeProps> = ({
  variant = 'yellow',
  children,
  className = '',
  ...props
}) => {
  const variantClasses = {
    yellow: 'bg-amber-100 text-amber-950 border-amber-300',
    green: 'bg-green-100 text-green-950 border-green-300',
    blue: 'bg-sky-100 text-sky-950 border-sky-300',
    purple: 'bg-purple-100 text-purple-950 border-purple-300',
    orange: 'bg-orange-100 text-orange-950 border-orange-300',
  }[variant];

  return (
    <span className={`text-kid-badge ${variantClasses} ${className}`} {...props}>
      {children}
    </span>
  );
};
