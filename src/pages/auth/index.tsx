import { AuthPage as AntdAuthPage, AuthProps } from "@pankod/refine-antd";
import { useRouterContext } from "@pankod/refine-core";

const authWrapperProps = {
    style: {
        background:
            "radial-gradient(50% 50% at 50% 50%,rgba(109,0,255,255) 0%,rgba(0, 0, 0, 0.5) 100%),url('images/login-bg.png')",
        backgroundSize: "cover",
    },
};

const RenderAuthContent = (content: React.ReactNode) => {
    const { Link } = useRouterContext();

    return (
        <div className="general_bar"
            
        >
            <Link to="/">
                <img 
                    className="logo"
                    src="https://www.gesund.ai/gesundLogo.svg"
                    alt="Logo"
                />
            </Link>
            {content}
        </div>
    );
};

export const AuthPage: React.FC<AuthProps> = ({ type, formProps }) => {
    return (
        <AntdAuthPage
            type={type}
            wrapperProps={authWrapperProps}
            renderContent={RenderAuthContent}
            formProps={formProps}
        />
    );
};
