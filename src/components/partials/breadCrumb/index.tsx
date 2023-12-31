import { CustomLink } from '../CustomLink'

export function Breadcrumb({
  URLs,
  className = ''
}: {
  URLs: Array<{ name: string; url?: string }>
  className?: string
}) {
  return (
    <nav aria-label="breadcrumb" className={className}>
      <ol className="flex space-x-2">
        <li>
          <CustomLink
            href="/"
            className="after:content-['/'] after:ml-2 text-gray-600 hover:text-indigo-700"
          >
            <b>Home</b>
          </CustomLink>
        </li>
        {URLs.map((content, idx) => {
          if (idx === URLs.length - 1) {
            return (
              <li key={idx}>
                <CustomLink
                  href={content.url || '#'}
                  className={`text-gray-600 hover:text-indigo-700`}
                >
                  <b>{content.name}</b>
                </CustomLink>
              </li>
            )
          }
          return (
            <li key={idx}>
              <CustomLink
                href={content.url || '#'}
                className={`after:content-['/'] after:ml-2 text-gray-600 hover:text-indigo-700`}
              >
                <b>{content.name}</b>
              </CustomLink>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
