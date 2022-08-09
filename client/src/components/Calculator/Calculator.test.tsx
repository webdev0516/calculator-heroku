// External Dependencies
import { mount } from "enzyme";
import axios from "axios";
import { waitFor } from "@testing-library/react";

// Internal Dependencies
import Calculator from "./Calculator";

const testInput = async (btnGroup: any, expr: string) => {
    for (let ch of expr) {
        if (ch >= "0" && ch <= "9") {
            btnGroup.numBtn[Number(ch)].simulate("click");
        }
        if (ch === "+") await btnGroup.plusBtn.simulate("click");
        if (ch === "-") await btnGroup.minusBtn.simulate("click");
        if (ch === "*") await btnGroup.timesBtn.simulate("click");
        if (ch === "/") await btnGroup.divBtn.simulate("click");
        if (ch === "=") await btnGroup.eqBtn.simulate("click");
        if (ch === ".") btnGroup.pointBtn.simulate("click");
        if (ch === "C") btnGroup.acBtn.simulate("click");
    }
};

const getButtonGroup = () => {
    const app = mount(<Calculator />);
    const display = app.find("#display");
    const plusBtn = app.find("[id='btn-+']");
    const minusBtn = app.find("[id='btn--']");
    const timesBtn = app.find("[id='btn-*']");
    const divBtn = app.find("[id='btn-/']");
    const eqBtn = app.find("[id='btn-=']");
    const acBtn = app.find("#btn-C");
    const pointBtn = app.find("[id='btn-.']");
    const numBtn = Array(10);
    for (let i = 0; i < 10; i++) numBtn[i] = app.find(`#btn-${i}`);
    return {
        display,
        plusBtn,
        minusBtn,
        timesBtn,
        divBtn,
        eqBtn,
        acBtn,
        pointBtn,
        numBtn,
    };
};

const getMockedAxios = () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockImplementation((url) => {
        const searchParams = new URLSearchParams(
            url.slice(url.indexOf("?") + 1)
        );
        if (searchParams == null) return Promise.reject();

        let operation = searchParams.get("operation");
        let total = searchParams.get("total");
        let next = searchParams.get("next");
        let rlt;

        let totalNum = isNaN(Number(total)) ? null : Number(total);
        let nextNum = isNaN(Number(next)) ? null : Number(next);
        
        if (nextNum == null) {
            rlt = totalNum ? totalNum : "0";
        } else {
            switch (operation) {
                case "plus":
                    rlt = totalNum as number + nextNum;
                    break;
                case "minus":
                    rlt = totalNum as number - nextNum;
                    break;
                case "times":
                    rlt = totalNum as number * nextNum;
                    break;
                case "divide":
                    rlt = totalNum as number / nextNum;
                    break;
                default: {
                    rlt = nextNum;
                }
            }
        }
        rlt = String(rlt);

        return Promise.resolve({
            data: rlt,
        });
    });
    return mockedAxios;
};

jest.mock("axios");

describe("tests calculation", () => {
    it("input validation", () => {
        const btnGroup = getButtonGroup();
        testInput(btnGroup, "0..123..456");
        expect(btnGroup.display.getDOMNode().innerHTML).toEqual("0.123456");

        testInput(btnGroup, "C");
        expect(btnGroup.display.getDOMNode().innerHTML).toEqual("0");

        testInput(btnGroup, "0123456");
        expect(btnGroup.display.getDOMNode().innerHTML).toEqual("123456");
    });

    it("test plus", async () => {
        const btnGroup = getButtonGroup();
        const mockedAxios = getMockedAxios();

        testInput(btnGroup, "123+=");
        await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(2));
        expect(btnGroup.display.getDOMNode().innerHTML).toEqual("123");

        testInput(btnGroup, "123+45+6=");
        await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(5));
        expect(btnGroup.display.getDOMNode().innerHTML).toEqual("174");
    });

    it("test minus", async () => {
        const btnGroup = getButtonGroup();
        const mockedAxios = getMockedAxios();

        testInput(btnGroup, "123-=");
        await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(2));
        expect(btnGroup.display.getDOMNode().innerHTML).toEqual("123");

        testInput(btnGroup, "123-45-6=");
        await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(5));
        expect(btnGroup.display.getDOMNode().innerHTML).toEqual("72");
    });

    it("test times", async () => {
        const btnGroup = getButtonGroup();
        const mockedAxios = getMockedAxios();

        testInput(btnGroup, "123*=");
        await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(2));
        expect(btnGroup.display.getDOMNode().innerHTML).toEqual("123");

        testInput(btnGroup, "123*45*6=");
        await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(5));
        expect(btnGroup.display.getDOMNode().innerHTML).toEqual("33210");
    });

    it("test divide", async () => {
        const btnGroup = getButtonGroup();
        const mockedAxios = getMockedAxios();

        testInput(btnGroup, "256/2=");
        await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(2));
        expect(btnGroup.display.getDOMNode().innerHTML).toEqual("128");

        testInput(btnGroup, "256/2/2=");
        await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(5));
        expect(btnGroup.display.getDOMNode().innerHTML).toEqual("64");
    });
});
