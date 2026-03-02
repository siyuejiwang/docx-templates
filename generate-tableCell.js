const createReport = require('./lib/index').createReport;
const fs = require('fs');
const path = require('path');

async function main() {
  // 列定义
  const columns = [
    { label: '序号' },
    { label: '项目' },
    { label: '数值' },
    { label: '单位' },
  ];

  // 二维数组数据
  const data = [
    [{ value: '1' }, { value: '光伏方案', hMerge: '3' }],
    [
      { value: '2' },
      { value: '储能容量' },
      { value: '500' },
      { value: 'kWh' },
    ],
    [
      { value: '3' },
      { value: '投资总额' },
      { value: '1250.8' },
      { value: '万元' },
    ],
    [
      { value: '4' },
      { value: '年发电量' },
      { value: '3250' },
      { value: 'MWh' },
    ],
  ];

  const template = await fs.promises.readFile(
    path.join(__dirname, 'src/__tests__/fixtures/tableCell.docx')
  );

  const result = await createReport({
    template,
    cmdDelimiter: ['++', '++'],
    data: {
      columns: columns,
      data: data,
    },
  });

  // 保存为 word 文件
  const outputPath = path.join(__dirname, 'tableCell-output.docx');
  fs.writeFileSync(outputPath, result);
  console.log('Word file generated:', outputPath);
}

main().catch(console.error);
