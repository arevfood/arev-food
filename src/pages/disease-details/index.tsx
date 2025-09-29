import ContentsDiseaseDetails from '@/contents/disease-details'
import MainLayouts from '@/layouts/main'
import { useParams } from 'react-router'
import { useDisease } from '@/hooks/data/disease'

const PageDiseaseDetails: React.FC = () => {
  const { id }: { id: string } = useParams()
  const { data: diseaseDetails } = useDisease({ slug: id })

  return (
    <MainLayouts transparent fullWidth>
      {diseaseDetails && <ContentsDiseaseDetails data={diseaseDetails} />}
    </MainLayouts>
  )
}

export default PageDiseaseDetails
