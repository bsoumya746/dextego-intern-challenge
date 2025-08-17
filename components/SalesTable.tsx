import { LoaderWrapper } from './LoaderWrapper';

export function SalesTable({ data, loading }: { data: any[]; loading: boolean }) {
  return (
    <LoaderWrapper loading={loading}>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th>Product</th>
            <th>Sales</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              <td>{item.name}</td>
              <td>{item.sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </LoaderWrapper>
  );
}