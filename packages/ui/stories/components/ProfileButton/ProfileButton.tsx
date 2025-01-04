import { Avatar } from 'primereact/avatar'

interface ProfileButtonProps {
  fullName: string
}

export const ProfileButton = ({ fullName }: ProfileButtonProps) => {
  const initials = () => {
    const [firstName, lastName] = fullName.split(' ')

    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`
  }

  return (
    <div className="flex items-center gap-3" data-cy="profile-button">
      <Avatar label={initials()} size="normal" shape="circle" className="bg-button text-button" />
      <span className="text-surface-700">{fullName}</span>
    </div>
  )
}
