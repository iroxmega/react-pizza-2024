import React from "react"
import ContentLoader from "react-content-loader"

type SkeletonProps = {
    key:number
}

const PizzaSkeleton:React.FC<SkeletonProps> = (props) => (
    <div className='pizza-block-wrapper'>
        <ContentLoader
            className="pizza-block"
            speed={2}
            width={280}
            height={465}
            viewBox="0 0 280 465"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="3" y="261" rx="9" ry="9" width="274" height="28" />
            <rect x="204" y="258" rx="0" ry="0" width="2" height="10" />
            <rect x="3" y="309" rx="15" ry="15" width="275" height="79" />
            <rect x="3" y="419" rx="10" ry="10" width="104" height="33" />
            <rect x="132" y="412" rx="25" ry="25" width="148" height="45" />
            <circle cx="138" cy="119" r="118" />
        </ContentLoader>
    </div>

)

export default PizzaSkeleton