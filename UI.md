# UI

## Color Palette

- Colors will be declared at the beginning of relevent .css files
- Colors will be defined using color hex codes (ex. #FFFFFF)
- The color palette for Dark Mode [default] shall be defined as follows:
    - Page Backgrounds: #171717
    - Snippet Text Background: #1F1F1F
    - Dropdown Background: #3C3C3C
    - Dropdown Background (ON HOVER): #535353
    - Website Text: #D9D9D9
    - Icon: #D9D9D9
    - Module/Button Border: #D9D9D9
    - Icon (ON HOVER): #569CD6
    - Module/Button Border (ON HOVER): #569CD6
    - Snippet Function Code: #FFFFFF
    - In-Snippet Comment: #6A9955
- Additional color palettes may be added per development scope

## Typography

- Text font sizes shall be classified per usage:
    - CSnippy header title: 40pt (BOLD)
    - Misc. text: 32pt
    - Snippet code: 24pt
- Text fonts shall be classified per usage:
    - CSnippy header title: 'Instrument Sans'
    - Misc. text: 'Jaldi'
    - Snippet code: 'Roboto Mono'

## Layout

- The layout of each page shall consist of:
    - A consistent header including the site name and a settings icon
    - Relevant content shall be displayed below the header as:
        - <div id='body'>
            <div id='content'>
            </div>
          </div>
- Each UI element shall be accessible via tab index
- UI elements shall rearrange to match mobile display aspect ratios
