import { FilterListModel } from '@/models/filter-list'
import CustomCheckbox from '@/components/common/checkbox'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IonIcon } from '@ionic/react'

const SearchFilterItem: React.FC<{
  item: FilterListModel
  selectedFilter: { [key: string]: string[] }
  handleSelectFilter: (filter: { key: string; value: string }) => void
}> = ({ item, selectedFilter, handleSelectFilter }) => {
  const [expand, setExpand] = useState(false)

  return (
    <div>
      <div className="font-heading font-bold mb-2" onClick={() => setExpand(!expand)}>
        <div className="flex items-center justify-between gap-2">
          {item.label}
          <motion.div
            className="rotate-270 text-[12px] flex items-center justify-center"
            animate={{ rotate: expand ? 360 : 270 }}
            transition={{ duration: 0.3 }}
          >
            <IonIcon icon={'/icons/chevron-left.svg'} />
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={expand ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap gap-4 overflow-hidden"
        >
          {item.items.map((list) => {
            return (
              <CustomCheckbox
                key={list.key}
                label={list.label}
                checked={selectedFilter[item.key]?.includes(list.key) || false}
                onChange={() => {
                  handleSelectFilter({
                    key: item.key,
                    value: list.key,
                  })
                }}
              />
            )
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default SearchFilterItem
