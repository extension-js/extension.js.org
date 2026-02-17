import {sectionTitleClass} from './content'

export function SeeInActionSection() {
  return (
    <section className="pb-10">
      <h2 className={sectionTitleClass}>See Extension.js in action</h2>
      <div className="mx-auto mt-6 max-w-3xl">
        <div
          style={{
            position: 'relative',
            paddingBottom: '62.5%',
            height: 0
          }}
        >
          <iframe
            src="https://www.loom.com/embed/58e21900d693417db1e0e59c0a96c4b3?sid=80cf1003-7ed1-4f9d-a3fb-01c7876983ad"
            frameBorder="0"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          ></iframe>
        </div>
      </div>
    </section>
  )
}
