import DocumentItem from './DocumentItem'

const DocumentContainer = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      <DocumentItem type="file" />
      <DocumentItem />
    </div>
  )
}

export default DocumentContainer
