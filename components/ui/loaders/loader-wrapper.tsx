import { FC } from "react";

export const LoaderWrapper: FC = (props) => {
    return (
        <div className="flex items-center justify-center ">
            <div>
                {props.children}
                <div className="text-center">
                    loading...
                </div>
            </div>
        </div>
    )
}