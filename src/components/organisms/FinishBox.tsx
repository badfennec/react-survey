export default function FinishBox({ children }: { children?: React.ReactNode }) {
    return(<>
        <div className="text-sm border border-slate-300 rounded-md py-4 px-5">
            { children }
        </div>
    </>);
}