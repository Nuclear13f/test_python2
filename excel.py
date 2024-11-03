import openpyxl
from coredb import mod_sql_products
import time


wb = openpyxl.load_workbook("Code_Product.xlsx")
print(wb.sheetnames)
ws = wb['Migration_to_psql']
print(ws)

# wb.create_sheet("new_sheet")
# wb.save("Code_Product.xlsx")
# print(ws['b5'].value)
# print(ws.cell(row=6, column=3).value)

# value_range = ws['a2':'b12']
# print(value_range)

# for a,b in value_range:
#     print(a.value, b.value)

start = time.time()

rows = ws.iter_rows(min_row=3, max_row=10844, min_col=2, max_col=20)

# for row in rows:
#     print(row)
sas = []
for c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15, c16, c17, c18, c19 in rows:
    d = {'id_product': c1.value, 'type': c16.value, 'c1': c17.value,'c2': c18.value,'c3': c19.value, 'unit': c10.value, 'ratio': c11.value, 'product': c2.value, 'provider_id': c3.value}
    # sas.append(d)
    data = mod_sql_products(d);
    # print(type(str(a.value)))


stop = time.time()
s = stop-start
print('\n', round(s,2), 'сек.')