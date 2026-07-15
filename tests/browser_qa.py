import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
ROOT=Path(__file__).resolve().parents[1]

def bundle():
    html=(ROOT/'index.html').read_text()
    css=(ROOT/'styles.css').read_text()
    data=(ROOT/'data.js').read_text().replace('export const ','const ').replace('export function ','function ')
    app=(ROOT/'app.js').read_text()
    app=app.replace("import { APP_VERSION, lessons, translations, searchableEntries } from './data.js';",'')
    html=html.replace('<link rel="stylesheet" href="styles.css">',f'<style>{css}</style>')
    html=html.replace('<script type="module" src="app.js"></script>',f'<script>{data}\n{app}</script>')
    return html

async def main():
    async with async_playwright() as p:
        chromium_path=Path('/usr/bin/chromium')
        launch_args={'headless':True,'args':['--no-sandbox']}
        if chromium_path.exists(): launch_args['executable_path']=str(chromium_path)
        browser=await p.chromium.launch(**launch_args)
        context=await browser.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True)
        page=await context.new_page(); errors=[]
        page.on('console',lambda msg: errors.append(f'console:{msg.type}:{msg.text}') if msg.type=='error' else None)
        page.on('pageerror',lambda err: errors.append(f'page:{err}'))
        await page.set_content(bundle(),wait_until='load')
        await page.wait_for_selector('#start')
        await page.select_option('#lang','en'); await page.click('#start')
        await page.wait_for_selector('.lesson-card')
        assert await page.locator('.lesson-card').count()==5
        assert await page.evaluate('document.documentElement.scrollWidth <= document.documentElement.clientWidth')

        await page.fill('#search','evl'); await page.wait_for_selector('.search-results')
        assert await page.locator('.search-results button').count()>=1

        await page.click('[data-open-lesson="alphabet"]')
        await page.click('#begin-practice')
        await page.click('.option:nth-child(1)'); await page.click('#check')
        await page.wait_for_selector('.feedback.error')
        assert await page.locator('.feedback.error').inner_text()=='Not quite. Try again.'
        assert await page.locator('.option.correct, .option.answer, [data-correct="true"]').count()==0
        assert await page.locator('.feedback.error').inner_text()=='Not quite. Try again.'
        await page.click('.option:nth-child(2)'); await page.click('#check')
        await page.wait_for_selector('.feedback.success')
        await page.click('#check')
        assert await page.locator('.question-meta span').first.inner_text()=='2/4'

        await page.evaluate("location.hash='#/home'")
        await page.wait_for_selector('.lesson-card')
        await page.evaluate("location.hash='#/lesson/plural'")
        await page.wait_for_selector('#begin-practice')
        await page.click('#begin-practice')
        await page.click('[data-part="ev"]'); await page.click('[data-part="ler"]'); await page.click('#check')
        await page.wait_for_selector('.feedback.success')

        await page.evaluate("location.hash='#/settings'")
        await page.wait_for_selector('#settings-lang')
        await page.select_option('#settings-lang','id')
        await page.wait_for_selector('#settings-lang')
        assert await page.locator('.page-head .eyebrow').inner_text()=='PENGATURAN'

        assert await page.evaluate('document.documentElement.scrollWidth <= document.documentElement.clientWidth')
        if errors: raise AssertionError(errors)
        await browser.close()
        print('BROWSER_QA_OK')

asyncio.run(main())
