import ContentsFoodDetails from '@/contents/food-details'
import MainLayouts from '@/layouts/main'
import { useParams } from 'react-router'

const PageFoodDetails: React.FC = () => {
  const { id }: { id: string } = useParams()
  return (
    <MainLayouts transparent fullWidth key={id}>
      <ContentsFoodDetails id={id} />
    </MainLayouts>
  )
}

export default PageFoodDetails
