from coredb import mod_sql_products, check_prod
import time
import openpyxl


class CoreXLSX:
    def migration_product_in_postgres(self):
        wb = openpyxl.load_workbook("Code_Product_SQL.xlsx")
        ws = wb['Migration_to_psql']
        start = time.time()
        rows = ws.iter_rows(min_row=10845, max_row=11171, min_col=2, max_col=20)
        for c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15, c16, c17, c18, c19 in rows:
            d = {'id_product': c1.value, 'type': c16.value, 'c1': c17.value, 'c2': c18.value, 'c3': c19.value,
                 'unit': c10.value, 'ratio': c11.value, 'product': c2.value, 'provider_id': c3.value}
            data = mod_sql_products(d);
        stop = time.time()
        s = stop - start
        print('\n', round(s, 2), 'сек.')

    def read_xlsx_products(file_name):
        wb = openpyxl.load_workbook(file_name)
        ws = wb.active
        str_pet = ws['f2']
        data = []
        if check_petrovich(str_pet) == "ok":
            rows = ws.iter_rows(min_row=9, max_row=ws.max_row, min_col=3, max_col=4)
            data = check_prod(rows)
        else:
            if ws.max_column > 2:
                return {'status': 'err', 'data': []}
            else:
                rows = ws.iter_rows(min_row=1, max_row=ws.max_row, min_col=1, max_col=2)
                if rows:
                    data = check_prod(rows)
            # for c1, c2 in rows:
            #     pass

        return {'status': 'ok', 'data': data}


def check_petrovich(str_1):
    symbol = '"'
    for r in str_1.value.split():
        if "Петрович" in r.replace(symbol, ""):
            return "ok"
    return "no"

# CoreXLSX.migration_product_in_postgres('w');


# wb.create_sheet("new_sheet")
# wb.save("Code_Product.xlsx")
# print(ws['b5'].value)
# print(ws.cell(row=6, column=3).value)
# value_range = ws['a2':'b12']
# print(value_range)
# for a,b in value_range:
#     print(a.value, b.value)
# for row in rows:
#     print(row)
