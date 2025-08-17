import { LoaderWrapper } from './LoaderWrapper';

export function SalesCard({ data, loading }: { data: any; loading: boolean }) {
  return (
    <LoaderWrapper loading={loading}>
      <div className="bg-white dark:bg-gray-900 p-4 rounded shadow">
        {/* Your card content */}
        <h3 className="text-lg font-semibold">Sales</h3>
        <p>{data?.sales || 0}</p>
      </div>
    </LoaderWrapper>
  );
}