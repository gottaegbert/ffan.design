import dynamic from "next/dynamic";

export function SplineD() {
    const Spline = dynamic(() => import("@splinetool/react-spline"), {
        ssr: false,
    });

    return (
        <Spline scene="https://prod.spline.design/QTRXs0fwtg2WHjeV/scene.splinecode"
            className="w-full h-full"
        />
    );
}

// export function BookPlant() {
//     const Spline = dynamic(() => import("@splinetool/react-spline"), {
//         ssr: false,
//     });
//     return (
//         <Spline
//             scene="https://prod.spline.design/GHzdi3uELfz37BpW/scene.splinecode"
//             className="w-full h-full"
//         />
//     );
// }
