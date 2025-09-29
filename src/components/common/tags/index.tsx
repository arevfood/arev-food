type propTypes = { label: string; status?: 'SUCCESS' | 'NORMAL' | 'WARNING' | 'DANGER' }

const Tags: React.FC<propTypes> = ({ label, status = 'SUCCESS' }) => {
  const statusMapping = {
    SUCCESS: 'bg-green-500',
    NORMAL: 'bg-blue-500',
    WARNING: 'bg-yellow-500',
    DANGER: 'bg-red-500',
  }
  return (
    <div
      className={`font-paragraph font-bold text-[14px] px-2 rounded-[100px] ${statusMapping[status]}`}
    >
      {label}
    </div>
  )
}

export default Tags
