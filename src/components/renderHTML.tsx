interface ShowHtmlProps {
    htmlContent: string;
}

export const ShowHtml: React.FC<ShowHtmlProps> = ({ htmlContent }) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} >
        </div>
    );
}