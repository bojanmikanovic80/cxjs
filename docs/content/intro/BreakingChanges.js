import { HtmlElement, Tab, ValidationGroup, TextField, Checkbox, Button, MsgBox } from 'cx/widgets';
import { Content, Rescope, LabelsLeftLayout, Controller } from 'cx/ui';
import { Svg } from 'cx/svg';
import { Chart, Gridlines, NumericAxis, BubbleGraph } from 'cx/charts';
import {Md} from '../../components/Md';
import {CodeSplit} from '../../components/CodeSplit';
import {CodeSnippet} from '../../components/CodeSnippet';



export const BreakingChanges = <cx>
    <Rescope bind="$page">
        <Md>
            # Breaking Changes

            From time to time we're forced to introduce breaking changes to the framework.
            This page will serve to document such events and provide information how to migrate your apps.

            ## 17.4.0

            We're happy to announce that we obtained ownership of the `cx` package at [npmjs](https://www.npmjs.com/package/cx)
            and therefore our `cx-core` package will be replaced with `cx` and deprecated.

            To migrate your apps, please do the following:

            In `package.json` replace `cx-core` with `cx`.
            ```
            "cx-core": "^17.3.14",
            ```
            should become
            ```
            "cx": "^17.4.0",
            ```

            Additionally, if `babel-plugin-transform-cx-imports` is used with `useSrc` option,
            in `webpack.config.js` `cx` package should be whitelisted
            instead of `cx-core` in your `.js` `babel-loader`.

            ```
                test: /\.js$/,
                loader: 'babel-loader',
                include: /(app|cx)/,  //previously (app|cx-core)
            ```

            After you're done, please upgrade all Cx related packages to the latest version.
            ```
            yarn upgrade-interactive
            ```

            That's it.

            The `cx-core` package will continue to work for some time, however, it's advisable for all users to switch to the new
            package. The benefit of this change is that code completion will now work as IDEs will be able to find the
            `cx` package.
        </Md>
    </Rescope>
</cx>
