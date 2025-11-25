const ContentItem: React.FC<{ title: string; value: string; type?: string }> = ({
  title,
  value,
  type = 'row',
}) => {
  return (
    <>
      <div
        className={`flex ${type === 'column' ? 'flex-col gap-2' : 'flex-row gap-4'} items-start justify-between text-black mb-6 last:mb-0`}
      >
        <div className="font-bold font-heading text-[16px] w-[50%]">{title}</div>
        <div className={`text-black/40 text-[14px] ${type === 'row' ? 'w-[50%] text-right' : ''}`}>
          {value}
        </div>
      </div>
    </>
  )
}

export default ContentItem
