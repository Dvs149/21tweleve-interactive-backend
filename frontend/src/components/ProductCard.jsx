import React from 'react'

export const ProductCard = ({ name, detail, image }) => {
    return (
        <section className="text-gray-600 body-font mx-auto">
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                <img className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src={image} />
                <div className="text-center lg:w-2/3 w-full">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">{name}</h1>
                    <p className="mb-8 leading-relaxed">{detail}</p>
                </div>
            </div>
        </section>

    )
}
