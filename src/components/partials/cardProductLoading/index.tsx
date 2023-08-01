export function CardProductLoading() {
  return (
    <section className="flex flex-col p-2 items-center">
      <div className="flex w-[180px] md:w-[240px] lg:w-[300px] flex-col p-2 pb-10 items-start">
        <div className="w-full py-[50%]">
          <svg
            className="m-auto w-[80px] md:w-[140px] lg:w-[200px]"
            viewBox="0 0 38 38"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#6366f1"
          >
            <g fill="none" fillRule="evenodd">
              <g transform="translate(1 1)" strokeWidth="2">
                <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                <path d="M36 18c0-9.94-8.06-18-18-18">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </path>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </section>
  )
}
