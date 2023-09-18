uses crt,PseudoGraphic,Forms2;

const
  n = 5;

type
  

  matrix = array[1..n, 1..n] of real;
{Обмена столбцами}
procedure Obmen(var a: matrix; k, l: byte);
var
  
  i, j: byte;
  x: real;
begin

  for i := 1 to n do
  begin
    x := a[i, k];
    a[i, k] := a[i, l];
    a[i, l] := x;
  end;
end;
{Вывод матриц на экран}
procedure Vyvod(var a: matrix);
var
  i, j: byte;
begin
  for i := 1 to n do
  begin
    for j := 1 to n do
      write(a[i, j]:8:2);
    writeln;
  end;
  writeln;
end;
{Умножение матриц}
procedure Umn(a, b: matrix; var c: matrix);
var
  i, j, p: byte;
begin
  for p := 1 to n do
    for j := 1 to n do
    begin
      c[p, j] := 0;
      for i := 1 to n do
        c[p, j] := c[p, j] + a[p, i] * b[i, j];
    end;
end;

procedure TransponMatrix(var m: Matrix);
var
  i, j: integer;
begin
  for i := 2 to n do
  begin
    for j := 1 to i - 1 do
    begin
      Swap(m[i, j], m[j, i]);
    end;
  end;
end;

var
  a, b, c, d, e, f, at: matrix;
  i, j, k, l, q, r: byte;
start:GuiComponents;
begin
  start:=createstartmenu;
fullrender(start);

readkey;
clrscr;
  clrscr;
  randomize;
  {Создание матрицы А}
  for i := 1 to n do
    for j := 1 to n do
      a[i, j] := 5 * random;
  writeln('Исходная матрица А:');
  Vyvod(a);
  write('Введите номер столбцов k и l:');
  readln(k,l);
  Obmen(a, k, l);
  writeln('Обмен столбцов ',k,' и ',l,':');
  Vyvod(a);
  {Создание матрицы В}
  for i := 1 to n do
    for j := 1 to n do
      b[i, j] := i / j;
  writeln('Исходная матрица B:');
  Vyvod(b);
  write('Нажмите Enter для продолжения...');
  readln;
  {Получим матрицу А в кубе}
  Umn(a, a, c);
  Umn(a, c, e);
  writeln('Матрица A^3');
  Vyvod(e);
  {Получим A^T}
  at := a;
  TransponMatrix(at);
  writeln('Матрица A^T');
  Vyvod(at);
  write('Нажмите Enter для продолжения...');
  readln;
  {Получим В*А}
  Umn(b, at, f);
  writeln('Матрица B*A^T');
  Vyvod(f);
  write('Нажмите Enter для продолжения...');
  readln;
  {Сумма матриц}
  for i := 1 to n do
    for j := 1 to n do
      d[i, j] := e[i, j] + f[i, j];
  writeln('Исходная матрица D:');
  Vyvod(d);
  write('Введите номер столбцов q и r:');
  readln(q,r);
  Obmen(d, q, r);
  writeln('Обмен столбцов ', q,' и ',r,':');
  Vyvod(d);
  write('Нажмите Enter для выхода...');
  readln
end.