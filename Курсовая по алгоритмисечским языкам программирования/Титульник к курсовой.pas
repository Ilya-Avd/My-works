unit Forms2;

interface

uses crt, PseudoGraphic;

function CreateStartMenu(): GuiComponents;

implementation

function CreateStartMenu(): GuiComponents;
var
  tmp: GuiComponents;
begin
  with tmp do
  begin
    window.title := 'Заставка';
    SetLength(texts, 17);
    with texts[0] do
    begin
      title := 'Министерство науки и высшего образования Российской Федерации';
      x := (WindowWidth - title.Length) div 2;
      y := 2;
    end;
    with texts[1] do
    begin
      title := 'Федеральное государственное бюджетное образовательное учреждение';
      x := (WindowWidth - title.Length) div 2;
      y := 3;
    end;
    with texts[2] do
    begin
      title := 'высшего образования "Рязанский государственный радиотехнический';
      x := (WindowWidth - title.Length) div 2;
      y := 4;
    end;
    with texts[3] do
    begin
      title := 'университет имени В.Ф. Уткина"';
      x := (WindowWidth - title.Length) div 2;
      y := 5;
    end;
    with texts[4] do
    begin
      title := 'кафедра "ЭВМ"';
      x := (WindowWidth - title.Length) div 2;
      y := 6;
    end;
    with texts[5] do
    begin
      title := 'Курсовая работа';
      x := (WindowWidth - title.Length) div 2;
      y := 10;
    end;
    with texts[6] do
    begin
      title := 'По теме';
      x := (WindowWidth - title.Length) div 2;
      y := 11;
    end;
    with texts[7] do
    begin
      title := '"Работа с матрицами"';
      x := (WindowWidth - title.Length) div 2;
      y := 12;
    end;
    with texts[8] do
    begin
      title := 'По дисциплине';
      x := (WindowWidth - title.Length) div 2;
      y := 13;
    end;
    with texts[9] do
    begin
      title := '"Алгоритмические языки и программирование"';
      x := (WindowWidth - title.Length) div 2;
      y := 14;
    end;
    with texts[10] do
    begin
      title := 'Выполнил:';
      x := WindowWidth - title.Length - 1;
      y := WindowHeight - 9;
    end;
    with texts[11] do
    begin
      title := 'Ст. гр. 045 ';
      x := WindowWidth - title.Length - 1;
      y := WindowHeight - 8;
    end;
    with texts[12] do
    begin
      title := 'Авданькин И.А';
      x := WindowWidth - title.Length - 1;
      y := WindowHeight - 7;
    end;
    with texts[13] do
    begin
      title := 'Проверила:';
      x := WindowWidth - title.Length - 1;
      y := WindowHeight - 5;
    end;
    {with texts[14] do
    begin
      title := 'Доц.Каф. ВПМ';
      x := WindowWidth - title.Length - 1;
      y := WindowHeight - 4;
    end;}
    with texts[14] do
    begin
      title := 'С.П.Каф. ВПМ';
      x := WindowWidth - title.Length - 1;
      y := WindowHeight - 4;
    end;
    with texts[15] do
    begin
      title := 'Москвитина О.А.';
      x := WindowWidth - title.Length - 1;
      y := WindowHeight - 3;
    end;
    with texts[16] do
    begin
      title := 'Рязань 2021';
      x := (WindowWidth - title.Length) div 2;
      y := WindowHeight;
    end;
  end;
  Result := tmp;
end;
begin
end.

