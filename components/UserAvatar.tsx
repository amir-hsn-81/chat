
import React from 'react';

interface UserAvatarProps {
  avatarUrl: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

const UserAvatar: React.FC<UserAvatarProps> = ({ avatarUrl, name, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <img
      src={avatarUrl}
      alt={name}
      className={`${sizeClasses[size]} rounded-full object-cover flex-shrink-0`}
    />
  );
};

export default UserAvatar;
